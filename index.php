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
    <script type="text/javascript">
    $( document ).ready(function() {
       $("#save").on("click", function(event) {
            console.log('hi');
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
    <div id="mainform">
        <div id="innerdiv">
            <h2>Upload Image using form</h2>
            <div id="formdiv">
                <h3>Upload Form</h3>
                <form action="" enctype="multipart/form-data" id="form" method=
                "post" name="form">
                    <div id="upload">
                        <input id="file" name="file" type="file">
                    </div><input id="submit" name="submit" type="submit" value=
                    "Upload">
                </form>
                <div id="detail">
                    <b>Note:</b>
                    <ul>
                        <li>To Choose file Click on folder.</li>
                        <li>You can upload- <b>images(jpeg,jpg,png).</b></li>
                        <li>Image should be less than 100kb in size.</li>
                    </ul>
                </div>
            </div>
            <div id="clear"></div>
            <div id="preview">
                <img id="previewimg" src="">
                <img src="yeeface.png" class="yeemage draggable" id="yeemage" style="display:none;">
            </div>
            <button id="save">Save</button>
            
        </div>
    </div>
</body>
</html>