<!DOCTYPE html>
<?php
$experiences = './experiences_of_the_past';
$read_watch = './read_watch_whatever';
$im_bored = './im_bored';
$links = './links';
?>
<html>
<head>
  <link rel="stylesheet" href="../site.css" />
  <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
  <style>body: {background-color: #000;}</style>
</head>
<body>
  <div class="tabs">
    <a class="tab f2" href="../whoami">whoami</a>
    <a class="tab f2" href="../blog">blog</a>
    <a class="tab highlighted f2" href="..">back</a>
  </div>
  <div class="sections">
    <div class="section">
      <div class="title f3">
        my experiences of the past
      </div>
<?php
foreach(array_diff(scandir($experiences), array('.', '..')) as $file) {
  $contents = file_get_contents($experiences.'/'.$file);
  echo <<<EOL
  <div class="content">
   $contents
  </div>
EOL;
}
?>
    </div>
    <div class="section">
      <div class="title f3">
        stuff you should read/watch/whatever
      </div>
<?php
foreach(array_diff(scandir($read_watch), array('.', '..')) as $file) {
  $contents = file_get_contents($read_watch.'/'.$file);
  echo <<<EOL
  <div class="content">
   $contents
  </div>
EOL;
}
?>
    </div>
    <div class="section">
      <div class="title f3">
        "razgriz, i'm bored, what should i do"
      </div>
<?php
foreach(array_diff(scandir($im_bored), array('.', '..')) as $file) {
  $contents = file_get_contents($im_bored.'/'.$file);
  echo <<<EOL
  <div class="content">
   $contents
  </div>
EOL;
}
?>
      </div>
    <div class="section">
      <div class="title f3">
        links & stuff
      </div>
<?php
foreach(array_diff(scandir($im_bored), array('.', '..')) as $file) {
  $contents = file_get_contents($im_bored.'/'.$file);
  echo <<<EOL
  <div class="content">
   $contents
  </div>
EOL;
}
?>
    </div>
  </div>
  <script src="/etc/collapsible.js"></script>
</body>
</html>
