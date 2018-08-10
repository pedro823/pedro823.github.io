<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/site.css" />
  <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
  <style>body: {background-color: #000;}</style>
</head>
<body>
  <div class="tabs">
    <a class="tab f2" href="whoami">whoami</a>
    <a class="tab highlighted f2" href="/">back</a>
    <a class="tab f2" href="etc">etc.</a>
  </div>
  <p style="color: #fff">
  <div class="posts">
  <?php
    $files = glob('posts/*.json');
    foreach($files as $postfile) {
      $content = file_get_contents($postfile);
      $json = json_decode($content, true);
      echo <<<EOL
      <div class="post">
        <div class="title f2">
          $json[title]
        </div>
        <div class="content">
          $json[content]
        </div>
      </div>
EOL;
    }
  ?>
  </p>
  </div>
  <div class="links">
    <a class="link" href="https://www.github.com/pedro823"><img src="gh.png" /></a>
    <a class="link" href="https://devpost.com/pedro823"><img src="https://devpost-challengepost.netdna-ssl.com/assets/reimagine2/devpost-logo-646bdf6ac6663230947a952f8d354cad.svg" /></a>
    <a class="link" href="https://www.linkedin.com/in/pedro-leyton-pereira-584371157/"><img src="lkdn.png" /></a>
  </div>
</body>
</html>
