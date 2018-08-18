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
    $id_num = count($files);
    foreach($files as $postfile) {
      $content = file_get_contents($postfile);
      $json = json_decode($content, true);
      echo <<<EOL
      <div class="post" id="post-$id_num">
        <div class="title f1">
          $json[title]
        </div>
        <div class="content f3">
          $json[content]
        </div>
      </div>
EOL;
      $id_num -= 1;
    }
  ?>
  </p>
  </div>
</body>
</html>
