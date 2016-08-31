<!DOCTYPE html>
<html>
<head>
    <title>Upload Image using form</title>
    <link href="style.css" rel="stylesheet">
    <script src=
    "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="script.js"></script>
    <script src="html2canvas.js"></script>
    <script src="interact.min.js"></script>
    <script src="draggable.js"></script>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/component.js"></script>
    <script type="text/javascript">
        $( document ).ready(function() {
           $("#save").on("click", function(event) {
              event.preventDefault();
              html2canvas(document.getElementById("preview"), {
                allowTaint: true,
                taintTest: false,
                onrendered: function(canvas) {
                  var img = canvas.toDataURL();
                  window.open(img);
                },
                width: 400,
                height: 400
              });
            });
        });
    </script>
</head>
<body>
    <form action="" enctype="multipart/form-data" id="form" method="post" name="form">
      <div class="outside">
        <div id="upload" class="save-upload upload">
            <input id="file" name="file" type="file">
        </div>
        <div class="save-upload">
            <img src="img/save_circle.png" style="display:none;" id="save" class="save" />
        </div>
      </div>
    </form>
            <div style="clear: both;"></div>
    <div id="preview">
        <img id="previewimg" src="" />
        <img src="yeeface.png" class="yeemage resize-image" id="yeemage" style="display:none;" />
    </div>
</body>
</html>
