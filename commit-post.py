import json
import os
from io import TextIOWrapper
import re


class ParseException(Exception):
    file = ''
    def __init__(self, message):
        self.message = message

    def __str__(self):
        if file != '':
            return '%s: %s' % (self.file, self.message)
        return self.message


def parse_file(file_descriptor: list) -> tuple:
    state = 0
    title = ''
    content = ''
    found_content = False
    for idx, line in enumerate(file_descriptor):
        if state == 0:  # Waiting for ### TITLE ### or ### COMMITTED ###
            if line.strip() == '### TITLE ###':
                state = 1
                continue
            elif line.strip() == '### COMMITTED ###':
                return '', ''
            else:
                raise ParseException('Expected "### TITLE ###" at line %d'
                                     % idx)

        elif state == 1:  # Waiting for title
            if line.strip() == '### CONTENT ###':
                found_content = True
                state = 2
            else:
                title += line
        elif state == 2:  # Waiting for content
            content += line
    if not found_content:
        raise ParseException('Expected "### CONTENT ###" line to be found '
                             + 'somewhere in the file, but wasn\'t found.')
    file_title = re.sub(r'\s+', '-', title.strip())
    return json.dumps(dict(title=title, content=content)), file_title


BASE_DIR = 'post-tester'

for file in sorted(os.listdir(BASE_DIR)):
    try:
        with open('%s/%s' % (BASE_DIR, file), 'r+') as f:
            final_json, title = parse_file(f)
            if title != '':
                with open('blog/posts/%s.json' % title, 'w+') as outfile:
                    outfile.write(final_json)
            f.seek(0)
            f.write('### COMMITTED ###\n')
    except ParseException as e:
        e.file = file
        raise
