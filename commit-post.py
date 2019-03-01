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


def parse_file(file_descriptor: TextIOWrapper) -> tuple:
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
    file_title = re.sub(r'\s+', '-', title.strip()).replace('/', '_')
    return json.dumps(dict(title=title, content=content)), file_title


BASE_DIR = 'posts'

for file in sorted(os.listdir(BASE_DIR)):
    try:
        with open(f'{BASE_DIR}/{file}', 'r') as f:
            final_json, title = parse_file(f)
            if title != '':
                print(f'creating blog/posts/{title}.json...')
                with open(f'blog/posts/{title}.json', 'w') as outfile:
                    outfile.write(final_json)
        with open(f'{BASE_DIR}/{file}', 'r') as f:
            whole_text = f.read()
        with open(f'{BASE_DIR}/{file}', 'w') as f:
            f.write(f'### COMMITTED ###\n{whole_text}')
    except ParseException as e:
        e.file = file
        raise
