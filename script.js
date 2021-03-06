$(document).ready(function() {
// Function for Preview Image.
$(function() {
    $(":file").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      resizeableImage($('.resize-image'));
      reader.readAsDataURL(this.files[0]);
    }
    });
});
    function imageIsLoaded(e) {
        $('#save').css("display", "inline");
        // $('.save-upload').css("float", "left");
        $('.save-upload').css("margin-right", "10px");
        $('#upload').css("display", "block");
        // $('#upload').css("float", "left");
        $('#upload').css("margin-right", "10px");
        $('#yeemage').css("display", "block");
        $('#preview').addClass("col-md-10");
        $('#left').addClass("col-md-2");
        $('#previewimg').attr('src', e.target.result);
        $('#form').addClass('shrink');
        $('.save').addClass('shrink');

        $('#upload-wrapper').removeClass("col-md-2 col-md-offset-5 col-sm-12");
        $('#upload-wrapper').addClass("col-md-12 col-sm-6 col-xs-6");
    };
    // Function for Deleting Preview Image.
    $("#deleteimg").click(function() {
        $('#preview').css("display", "none");
        $('#file').val("");
    });
});

//Resize JS
var resizeableImage = function(image_target) {
    var $container,
    orig_src = new Image(),
    image_target = image_target.get(0),
    event_state = {},
    constrain = false,
    min_width = 60,
    min_height = 60,
    max_width = 800,
    max_height = 900,
    resize_canvas = document.createElement('canvas');

    init = function(){
        console.log('init');
        // Create a new image with a copy of the original src
        // When resizing, we will always use this original copy as the base
        // orig_src.src=image_target.src;

        // Add resize handles
        $(image_target).wrap('<div class="resize-container"></div>')
        .before('<span class="resize-handle resize-handle-nw"></span>')
        .before('<span class="resize-handle resize-handle-ne"></span>')
        .after('<span class="resize-handle resize-handle-se"></span>')
        .after('<span class="resize-handle resize-handle-sw"></span>');

        // Get a variable for the container
        $container =  $(image_target).parent('.resize-container');

        // Add events
        $container.on('mousedown', '.resize-handle', startResize);
    };

    startResize = function(e){
        e.preventDefault();
        e.stopPropagation();
        saveEventState(e);
        $(document).on('mousemove', resizing);
        $(document).on('mouseup', endResize);
    };

    endResize = function(e){
        e.preventDefault();
        $(document).off('mouseup touchend', endResize);
        $(document).off('mousemove touchmove', resizing);
    };

    saveEventState = function(e){
      // Save the initial event details and container state
      event_state.container_width = $container.width();
      event_state.container_height = $container.height();
      event_state.container_left = $container.offset().left;
      event_state.container_top = $container.offset().top;
      event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
      event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

      // This is a fix for mobile safari
      // For some reason it does not allow a direct copy of the touches property
      if(typeof e.originalEvent.touches !== 'undefined'){
        event_state.touches = [];
        $.each(e.originalEvent.touches, function(i, ob){
          event_state.touches[i] = {};
          event_state.touches[i].clientX = 0+ob.clientX;
          event_state.touches[i].clientY = 0+ob.clientY;
        });
      }
      event_state.evnt = e;
    }

    resizing = function(e){
        var mouse={},width,height,left,top,offset=$container.offset();
        mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

        width = mouse.x - event_state.container_left;
        height = mouse.y  - event_state.container_top;
        left = event_state.container_left;
        top = event_state.container_top;

        if(constrain || e.shiftKey){
            height = width / orig_src.width * orig_src.height;
        }

        if(width > min_width && height > min_height && width < max_width && height < max_height){
          resizeImage(width, height);
          // Without this Firefox will not re-calculate the the image dimensions until drag end
          $container.offset({'left': left, 'top': top});
        }
    }

    resizeImage = function(width, height){
        resize_canvas.width = width;
        resize_canvas.height = height;
        resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
        $(image_target).attr('src', resize_canvas.toDataURL("image/png"));
    };


    init();
};
