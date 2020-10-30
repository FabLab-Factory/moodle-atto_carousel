// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_carousel
 * @copyright  2020 Zimcke Van de Staey <zimcke@fablabfactory.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_carousel-button
 */

/**
 * Atto text editor tutorials plugin.
 *
 * @namespace M.atto_carousel
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var CSS = {
  ADDIMAGE: 'atto_carousel_addmore',
  ELEMENT: 'carousel-element',
  RESPONSIVE: 'img-responsive',
  INPUTALIGNMENT: 'atto_carousel_alignment',
  INPUTALT: 'atto_carousel_altentry',
  INPUTHEIGHT: 'atto_carousel_heightentry',
  INPUTSUBMIT: 'atto_carousel_urlentrysubmit',
  INPUTADDIMAGE: 'atto_carousel_addimage',
  INPUTURL: 'atto_carousel_urlentry',
  INPUTSIZE: 'atto_carousel_size',
  INPUTWIDTH: 'atto_carousel_widthentry',
  IMAGEALTWARNING: 'atto_carousel_altwarning',
  IMAGEBROWSER: 'atto_carousel_openimagebrowser',
  IMAGEPRESENTATION: 'atto_carousel_presentation',
  INPUTCONSTRAIN: 'atto_carousel_constrain',
  INPUTCUSTOMSTYLE: 'atto_carousel_customstyle',
  IMAGEPREVIEW: 'atto_carousel_preview',
  IMAGEPREVIEWBOX: 'atto_carousel_preview_box',
  ALIGNSETTINGS: 'atto_carousel_button',
  CAROUSELID: 'atto_carousel_id',
},
SELECTORS = {
  INPUTURL: '.' + CSS.INPUTURL
},
ALIGNMENTS = [
  // Vertical alignment.
  {
      name: 'verticalAlign',
      str: 'alignment_top',
      value: 'text-top',
      margin: '0 0.5em'
  }
],

REGEX = {
  ISPERCENT: /\d+%/
},

COMPONENTNAME = 'atto_carousel',

TEMPLATE = '' +
    '<form class="atto_attoform">' +
        '<div class="container">' +

        '<div class="row">' +
            '<div class="col-12 mb-1">' +
                '<label for="{{CSS.CAROUSELID}}">{{get_string "entercarouselid" component}}</label>' +
                '<input class="form-control fullwidth {{CSS.CAROUSELID}} " type="text" ' +
                'id="{{CSS.CAROUSELID}}" size="32"/>' +
            '</div>' +
        '</div>' +

        '<div class="row">' +
            '<div class="col-md-6">' +
                // Add the repository browser button.
                '{{#if showFilepicker}}' +
                    '<div class="mb-1">' +
                        '<label for="{{elementid}}_{{CSS.INPUTURL}}">{{get_string "enterurl" component}}</label>' +
                        '<div class="input-group input-append w-100">' +
                            '<input class="form-control {{CSS.INPUTURL}} {{CSS.INPUTURL}}-1" type="url" ' +
                            'id="{{elementid}}_{{CSS.INPUTURL}}" size="32"/>' +
                            '<span class="input-group-append">' +
                                '<button class="btn btn-secondary {{CSS.IMAGEBROWSER}} {{CSS.IMAGEBROWSER}}-1" type="button">' +
                                '{{get_string "browserepositories" component}}</button>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '{{else}}' +
                    '<div class="mb-1">' +
                        '<label for="{{elementid}}_{{CSS.INPUTURL}}">{{get_string "enterurl" component}}</label>' +
                        '<input class="form-control fullwidth {{CSS.INPUTURL}} {{CSS.INPUTURL}}-1" type="url" ' +
                        'id="{{elementid}}_{{CSS.INPUTURL}}" size="32"/>' +
                    '</div>' +
                '{{/if}}' +

                // Add the alignment selector.
                '<div class="form-inline mb-1">' +
                '<label class="for="{{elementid}}_{{CSS.INPUTALIGNMENT}}">{{get_string "alignment" component}}</label>' +
                '<select class="custom-select {{CSS.INPUTALIGNMENT}}" id="{{elementid}}_{{CSS.INPUTALIGNMENT}}">' +
                    '{{#each alignments}}' +
                        '<option value="{{value}}">{{get_string str ../component}}</option>' +
                    '{{/each}}' +
                '</select>' +
                '</div>' +
                // Hidden input to store custom styles.
                '<input type="hidden" class="{{CSS.INPUTCUSTOMSTYLE}}"/>' +
                '<br/>' +
            
            '</div>' +
            '<div class="col-md-6">' +

                // Add the image preview.
                '<div class="mdl-align">' +
                '<div class="{{CSS.IMAGEPREVIEWBOX}}">' +
                    '<img src="#" class="{{CSS.IMAGEPREVIEW}} {{CSS.IMAGEPREVIEW}}-1" alt="" style="display: none;"/>' +
                '</div>' +

            '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row {{CSS.ADDIMAGE}}">' +
            '<div class="col-12">'+
                // Add the add image to carousel button .
                '<button class="btn btn-secondary {{CSS.INPUTADDIMAGE}}" type="button">' + '' +
                    '{{get_string "addimage" component}}</button>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +

                // Add the submit button and close the form.
                '<button class="btn btn-secondary {{CSS.INPUTSUBMIT}}" type="submit">' + '' +
                    '{{get_string "saveimage" component}}</button>' +


        '</div>' +
        '</div>' +
    '</form>',

IMAGETEMPLATE = '' +
    '<div class="carousel-item {{extraclasses}}">' +
    // slide number first-slide
    '<img class="{{slidenumber}}" src="{{url}}" alt="Carousel slide" style="width:100%">' +
        '<div class="container">' +
            '<div class="carousel-caption d-none d-md-block text-left">' +
            '</div>' +
        '</div>' +
    '</div>',

CAROUSELPRETEMPLATE = '' +
    '<div class="no-columns">' +
        '<div id="{{carouselid}}" class="carousel column-carousel slide" data-ride="carousel">' + 
            '<div class="carousel-inner" role="listbox">',

CAROUSELPOSTTEMPLATE = '' +
                // insert images here
            '</div>' +
            '<a class="carousel-control-prev invert" href="#{{carouselid}}" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="carousel-control-next invert" href="#{{carouselid}}" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
            '</a>' +
        '</div>' +
    '</div>' +
    '<p><br></p>';

Y.namespace('M.atto_carousel').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
/**
* A reference to the current selection at the time that the dialogue
* was opened.
*
* @property _currentSelection
* @type Range
* @private
*/
_currentSelection: null,

/**
* The most recently selected image.
*
* @param _selectedImage
* @type Node
* @private
*/
_selectedImage: null,

/**
* A reference to the currently open form.
*
* @param _attoform
* @type Node
* @private
*/
_attoform: null,

/**
 * The number of images in the carousel
 * 
 * @param _numberOfImages
 * @type Number
 * @private
 */
_numberOfImages: 1,

/**
* The dimensions of the raw image before we manipulate it.
*
* @param _rawImageDimensions
* @type Object
* @private
*/
_rawImageDimensions: null,

initializer: function() {

  this.addButton({
      icon: M.util.image_url("ed/" + 'editor_icon1',"atto_carousel"),
      callback: this._displayDialogue,
      tags: '.carousel',
      tagMatchRequiresAll: false
  });
  this.editor.delegate('dblclick', this._displayDialogue, '.carousel', this);
  this.editor.delegate('click', this._handleClick, '.carousel', this);
  this.editor.on('drop', this._handleDragDrop, this);

  // e.preventDefault needed to stop the default event from clobbering the desired behaviour in some browsers.
  this.editor.on('dragover', function(e) {
      e.preventDefault();
  }, this);
  this.editor.on('dragenter', function(e) {
      e.preventDefault();
  }, this);
},

/**
* Handle a drag and drop event with an image.
*
* @method _handleDragDrop
* @param {EventFacade} e
* @return mixed
* @private
*/
_handleDragDrop: function(e) {

  var self = this,
      host = this.get('host'),
      template = Y.Handlebars.compile(IMAGETEMPLATE);

  host.saveSelection();
  e = e._event;

  // Only handle the event if an image file was dropped in.
  var handlesDataTransfer = (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length);
  if (handlesDataTransfer && /^image\//.test(e.dataTransfer.files[0].type)) {

      var options = host.get('filepickeroptions').image,
          savepath = (options.savepath === undefined) ? '/' : options.savepath,
          formData = new FormData(),
          timestamp = 0,
          uploadid = "",
          xhr = new XMLHttpRequest(),
          imagehtml = "",
          keys = Object.keys(options.repositories);

      e.preventDefault();
      e.stopPropagation();
      formData.append('repo_upload_file', e.dataTransfer.files[0]);
      formData.append('itemid', options.itemid);

      // List of repositories is an object rather than an array.  This makes iteration more awkward.
      for (var i = 0; i < keys.length; i++) {
          if (options.repositories[keys[i]].type === 'upload') {
              formData.append('repo_id', options.repositories[keys[i]].id);
              break;
          }
      }
      formData.append('env', options.env);
      formData.append('sesskey', M.cfg.sesskey);
      formData.append('client_id', options.client_id);
      formData.append('savepath', savepath);
      formData.append('ctx_id', options.context.id);

      // Insert spinner as a placeholder.
      timestamp = new Date().getTime();
      uploadid = 'moodleimage_' + Math.round(Math.random() * 100000) + '-' + timestamp;
      host.focus();
      host.restoreSelection();
      imagehtml = template({
          url: M.util.image_url("i/loading_small", 'moodle'),
          alt: M.util.get_string('uploading', COMPONENTNAME),
          id: uploadid
      });
      host.insertContentAtFocusPoint(imagehtml);
      self.markUpdated();

      // Kick off a XMLHttpRequest.
      xhr.onreadystatechange = function() {
          var placeholder = self.editor.one('#' + uploadid),
              result,
              file,
              newhtml,
              newimage;

          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  result = JSON.parse(xhr.responseText);
                  if (result) {
                      if (result.error) {
                          if (placeholder) {
                              placeholder.remove(true);
                          }
                          return new M.core.ajaxException(result);
                      }

                      file = result;
                      if (result.event && result.event === 'fileexists') {
                          // A file with this name is already in use here - rename to avoid conflict.
                          // Chances are, it's a different image (stored in a different folder on the user's computer).
                          // If the user wants to reuse an existing image, they can copy/paste it within the editor.
                          file = result.newfile;
                      }

                      // Replace placeholder with actual image.
                      newhtml = template({
                          url: file.url,
                          presentation: true
                      });
                      newimage = Y.Node.create(newhtml);
                      if (placeholder) {
                          placeholder.replace(newimage);
                      } else {
                          self.editor.appendChild(newimage);
                      }
                      self.markUpdated();
                  }
              } else {
                  Y.use('moodle-core-notification-alert', function() {
                      new M.core.alert({message: M.util.get_string('servererror', 'moodle')});
                  });
                  if (placeholder) {
                      placeholder.remove(true);
                  }
              }
          }
      };
      xhr.open("POST", M.cfg.wwwroot + '/repository/repository_ajax.php?action=upload', true);
      xhr.send(formData);
      return false;
  }

},

/**
* Handle a click on an image.
*
* @method _handleClick
* @param {EventFacade} e
* @private
*/
_handleClick: function(e) {
  var image = e.target;

  var selection = this.get('host').getSelectionFromNode(image);
  if (this.get('host').getSelection() !== selection) {
      this.get('host').setSelection(selection);
  }
},

/**
* Display the image editing tool.
*
* @method _displayDialogue
* @private
*/
_displayDialogue: function() {
  // Store the current selection.
  this._currentSelection = this.get('host').getSelection();
  if (this._currentSelection === false) {
      return;
  }

  // Reset the image dimensions.
  this._rawImageDimensions = null;

  var dialogue = this.getDialogue({
      headerContent: M.util.get_string('imageproperties', COMPONENTNAME),
      width: 'auto',
      focusAfterHide: true,
      focusOnShowSelector: SELECTORS.INPUTURL
  });

  // Set the dialogue content, and then show the dialogue.
  dialogue.set('bodyContent', this._getDialogueContent())
          .show();
},

/**
* Set the inputs for width and height if they are not set, and calculate
* if the constrain checkbox should be checked or not.
*
* @method _loadPreviewImage
* @param {String} url
* @param {Number} indexImage
* @private
*/
_loadPreviewImage: function(url) {
  var image = new Image();
  var self = this;

  image.onerror = function() {
      var preview = self._attoform.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
      preview.setStyles({
          'display': 'none'
      });

      // Centre the dialogue when clearing the image preview.
      self.getDialogue().centerDialogue();
  };

  image.onload = function() {
      var input, currentwidth, currentheight, widthRatio, heightRatio;

      self._rawImageDimensions = {
          width: this.width,
          height: this.height
      };

      input = self._attoform.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
      input.setAttribute('src', this.src);
      input.setStyles({
          'display': 'inline'
      });

      self.getDialogue().centerDialogue();
  };

  image.src = url;
},

/**
* Return the dialogue content for the tool, attaching any required
* events.
*
* @method _getDialogueContent
* @return {Node} The content to place in the dialogue.
* @private
*/
_getDialogueContent: function() {
  var template = Y.Handlebars.compile(TEMPLATE),
      canShowFilepicker = this.get('host').canShowFilepicker('image'),
      content = Y.Node.create(template({
          elementid: this.get('host').get('elementid'),
          CSS: CSS,
          component: COMPONENTNAME,
          showFilepicker: canShowFilepicker,
          alignments: ALIGNMENTS
      }));
 
  this._attoform = content;

  // Configure the view of the first current image.
  this._applyImageProperties(this._attoform, 1);

  this._attoform.one('.' + CSS.INPUTURL + '-1').on('blur', this._getUrlChanged(this._attoform, 1), this);

  //this._attoform.one('.' + CSS.INPUTSUBMIT).on('click', this._setImage, this);
  this._attoform.one('.' + CSS.INPUTSUBMIT).on('click', this._setCarousel, this);

    if (canShowFilepicker) {
        content.delegate('click', function(e) {
            var element = this._attoform;
            e.preventDefault();
            this.get('host').showFilepicker('image', this._getFilepickerCallback(element, 1), this);
        }, '.atto_carousel_openimagebrowser-' + 1, this);
    }

    var elementid = this.get('host').get('elementid');

    this._attoform.one('.' + CSS.INPUTADDIMAGE).on('click', this._getAddNewImage(this._attoform, elementid, CSS, COMPONENTNAME, canShowFilepicker, ALIGNMENTS, this), this);

  return content;
},

/**
* Update the dialogue after an image was selected in the File Picker.
*
* @method _filepickerCallback
* @param {object} params The parameters provided by the filepicker
* containing information about the image.
* @private
*/
_filepickerCallback: function(params) {
  if (params.url !== '') {
      var input = this._attoform.one('.' + CSS.INPUTURL + '-1');
      input.set('value', params.url);

      // Load the preview image.
      this._loadPreviewImage(params.url);
  }
},

/**
     * Returns the callback for the file picker to call after a file has been selected.
     *
     * @method _getFilepickerCallback
     * @param  {Y.Node} element The element which triggered the callback (atto form)
     * @param  {Number} indexImage The index of the image in the carousel that has been selected starting from 1
     * @return {Function} The function to be used as a callback when the file picker returns the file
     * @private
     */
    _getFilepickerCallback: function(element, indexImage) {
        return function(params) {
            if (params.url !== '') {
                var input = element.one('.' + CSS.INPUTURL + '-' + indexImage);
                input.set('value', params.url);

                // Load the preview image.
                var image = new Image();

                image.onerror = function() {
                    var preview = element.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
                    preview.setStyles({
                        'display': 'none'
                    });
                };

                image.onload = function() {
                    var input;

                    input = element.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
                    input.setAttribute('src', this.src);
                    input.setStyles({
                        'display': 'inline'
                    });

                };

                image.src = params.url;
            }
        };
    },

_getAddNewImage: function(element, elementid, CSS, COMPONENTNAME, canShowFilepicker, ALIGNMENTS, context) {
    return function() {

        context._numberOfImages = context._numberOfImages + 1;
        var i = context._numberOfImages;

        var NEW_TEMPLATE = 
        '<div class="row">' +
            '<div class="col-md-6">' +
                // Add the repository browser button.
                '{{#if showFilepicker}}' +
                    '<div class="mb-1">' +
                        '<label for="{{elementid}}_{{CSS.INPUTURL}}">{{get_string "enterurl" component}}</label>' +
                        '<div class="input-group input-append w-100">' +
                            '<input class="form-control {{CSS.INPUTURL}} {{CSS.INPUTURL}}-' + i + '" type="url" ' +
                            'id="{{elementid}}_{{CSS.INPUTURL}}" size="32"/>' +
                            '<span class="input-group-append">' +
                                '<button class="btn btn-secondary {{CSS.IMAGEBROWSER}} {{CSS.IMAGEBROWSER}}-' + i + '" type="button">' +
                                '{{get_string "browserepositories" component}}</button>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '{{else}}' +
                    '<div class="mb-1">' +
                        '<label for="{{elementid}}_{{CSS.INPUTURL}}">{{get_string "enterurl" component}}</label>' +
                        '<input class="form-control fullwidth {{CSS.INPUTURL}} {{CSS.INPUTURL}}-' + i + '" type="url" ' +
                        'id="{{elementid}}_{{CSS.INPUTURL}}" size="32"/>' +
                    '</div>' +
                '{{/if}}' +

                // Add the alignment selector.
                '<div class="form-inline mb-1">' +
                '<label class="for="{{elementid}}_{{CSS.INPUTALIGNMENT}}">{{get_string "alignment" component}}</label>' +
                '<select class="custom-select {{CSS.INPUTALIGNMENT}}" id="{{elementid}}_{{CSS.INPUTALIGNMENT}}">' +
                    '{{#each alignments}}' +
                        '<option value="{{value}}">{{get_string str ../component}}</option>' +
                    '{{/each}}' +
                '</select>' +
                '</div>' +
                // Hidden input to store custom styles.
                '<input type="hidden" class="{{CSS.INPUTCUSTOMSTYLE}}"/>' +
                '<br/>' +
            
            '</div>' +
            '<div class="col-md-6">' +

                // Add the image preview.
                '<div class="mdl-align">' +
                    '<div class="{{CSS.IMAGEPREVIEWBOX}}">' +
                        '<img src="#" class="{{CSS.IMAGEPREVIEW}} {{CSS.IMAGEPREVIEW}}-' + i + '" alt="" style="display: none;"/>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        var template = Y.Handlebars.compile(NEW_TEMPLATE),
         new_content = Y.Node.create(template({
          elementid: elementid,
          CSS: CSS,
          component: COMPONENTNAME,
          showFilepicker: canShowFilepicker,
          alignments: ALIGNMENTS
        }));

        element.insert(new_content, Y.one('.' + CSS.ADDIMAGE));

        this._applyImageProperties(element, i);

        element.one('.' + CSS.INPUTURL + '-' + i).on('blur', this._getUrlChanged(element, i), this);

        if (canShowFilepicker) {
            element.delegate('click', function(e) {
                e.preventDefault();
                this.get('host').showFilepicker('image', this._getFilepickerCallback(element, i), this);
            }, '.atto_carousel_openimagebrowser-' + i, this);
        }
    };
},

/**
* Update the form when the URL was changed. This includes updating the
* height, width, and image preview.
*
* @method _getUrlChanged
* @private
*/
_getUrlChanged: function(element, indexImage) {
    return function() {
            var input = this._attoform.one('.' + CSS.INPUTURL + '-' + indexImage);
        
            if (input.get('value') !== '') {
                // Load the preview image.
                // Load the preview image.
                var image = new Image();

                image.onerror = function() {
                    var preview = element.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
                    preview.setStyles({
                        'display': 'none'
                    });
                };

                image.onload = function() {
                    var input;

                    input = element.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);
                    input.setAttribute('src', this.src);
                    input.setStyles({
                        'display': 'inline'
                    });

                };

                image.src = params.url;
            }
    }
  },

/**
* Applies properties of an existing image to the image dialogue for editing.
*
* @method _applyImageProperties
* @param {Node} form
* @param {Number} indexImage
* @private
*/
_applyImageProperties: function(form, indexImage) {
  var properties = this._getSelectedImageProperties(),
      img = form.one('.' + CSS.IMAGEPREVIEW + '-' + indexImage);

  if (properties === false) {
      img.setStyle('display', 'none');
      // Set the default alignment.
      ALIGNMENTS.some(function(alignment) {
          if (alignment.isDefault) {
              //form.one('.' + CSS.INPUTALIGNMENT).set('value', alignment.value);
              return true;
          }

          return false;
      }, this);

      return;
  }

  if (properties.align) {
      form.one('.' + CSS.INPUTALIGNMENT).set('value', properties.align);
  }
  if (properties.customstyle) {
      form.one('.' + CSS.INPUTCUSTOMSTYLE).set('value', properties.customstyle);
  }

  if (properties.src) {
      form.one('.' + CSS.INPUTURL + '-' + indexImage).set('value', properties.src);
      this._loadPreviewImage(properties.src, indexImage);
  }
},

/**
* Gets the properties of the currently selected image.
*
* The first image only if multiple images are selected.
*
* @method _getSelectedImageProperties
* @return {object}
* @private
*/
_getSelectedImageProperties: function() {
  var properties = {
          src: null,
          alt: null,
          align: '',
          presentation: false
      },

      // Get the current selection.
      images = this.get('host').getSelectedNodes(),
      style,
      image;

  if (images) {
      images = images.filter('img');
  }

  if (images && images.size()) {
      image = this._removeLegacyAlignment(images.item(0));
      this._selectedImage = image;

      style = image.getAttribute('style');
      properties.customstyle = style;

      this._getAlignmentPropeties(image, properties);
      properties.src = image.getAttribute('src');
      properties.presentation = (image.get('role') === 'presentation');
      return properties;
  }

  // No image selected - clean up.
  this._selectedImage = null;
  return false;
},

/**
* Sets the alignment of a properties object.
*
* @method _getAlignmentPropeties
* @param {Node} image The image that the alignment properties should be found for
* @param {Object} properties The properties object that is created in _getSelectedImageProperties()
* @private
*/
_getAlignmentPropeties: function(image, properties) {
  var complete = false,
      defaultAlignment;

  // Check for an alignment value.
  complete = ALIGNMENTS.some(function(alignment) {
      var classname = this._getAlignmentClass(alignment.value);
      if (image.hasClass(classname)) {
          properties.align = alignment.value;
          Y.log('Found alignment ' + alignment.value, 'debug', 'atto_carousel-button');

          return true;
      }

      if (alignment.isDefault) {
          defaultAlignment = alignment.value;
      }

      return false;
  }, this);

  if (!complete && defaultAlignment) {
      properties.align = defaultAlignment;
  }
},

/**
* Update the form when the URL was changed. This includes updating the
* height, width, and image preview.
*
* @method _urlChanged
* @private
*/
_urlChanged: function() {
  var input = this._attoform.one('.' + CSS.INPUTURL + '-1');

  if (input.get('value') !== '') {
      // Load the preview image.
      this._loadPreviewImage(input.get('value'), 1);
  }
},

/**
* Update the image in the contenteditable.
*
* @method _setCarousel
* @param {EventFacade} e
* @private
*/
_setCarousel: function(e) {
    var carouselhtml = '';

    var host = this.get('host');
    e.preventDefault();
  
    // Check if there are any accessibility issues.
    if (this._updateWarning()) {
        return;
    }
    var carouselid = this._attoform.one('.' + CSS.CAROUSELID).get('value');

    var carouselpretemplate = Y.Handlebars.compile(CAROUSELPRETEMPLATE);
    carouselpre = carouselpretemplate({
     carouselid: carouselid,
    });

    carouselhtml = carouselhtml + carouselpre;

    for(var i = 1; i <= this._numberOfImages; i++){
        
        var url = this._attoform.one('.' + CSS.INPUTURL + '-' + i).get('value');
        console.log('url', url);
        if(url !== ''){
            var extraclasses = '';
            if(i == 1) {
                extraclasses = 'active';
            } 

            var imagetemplate = Y.Handlebars.compile(IMAGETEMPLATE);
            image = imagetemplate({
                slidenumber: 'first-slide',
                url: url,
                extraclasses: extraclasses
            });

            carouselhtml = carouselhtml + image;
        }
    }

    var carouselposttemplate = Y.Handlebars.compile(CAROUSELPOSTTEMPLATE);
    carouselpost = carouselposttemplate({
     carouselid: carouselid,
    });

    carouselhtml = carouselhtml + carouselpost;

    host.focus();
    this.get('host').insertContentAtFocusPoint(carouselhtml);
  
    this.markUpdated();
  
    this.getDialogue({
      focusAfterHide: null
    }).hide();
},

/**
* Removes any legacy styles added by previous versions of the atto image button.
*
* @method _removeLegacyAlignment
* @param {Y.Node} imageNode
* @return {Y.Node}
* @private
*/
_removeLegacyAlignment: function(imageNode) {
  if (!imageNode.getStyle('margin')) {
      // There is no margin therefore this cannot match any known alignments.
      return imageNode;
  }

  ALIGNMENTS.some(function(alignment) {
      if (imageNode.getStyle(alignment.name) !== alignment.value) {
          // The name/value do not match. Skip.
          return false;
      }

      var normalisedNode = Y.Node.create('<div>');
      normalisedNode.setStyle('margin', alignment.margin);
      if (imageNode.getStyle('margin') !== normalisedNode.getStyle('margin')) {
          // The margin does not match.
          return false;
      }

      Y.log('Legacy alignment found and removed.', 'info', 'atto_carousel-button');
      imageNode.addClass(this._getAlignmentClass(alignment.value));
      imageNode.setStyle(alignment.name, null);
      imageNode.setStyle('margin', null);

      return true;
  }, this);

  return imageNode;
},

_getAlignmentClass: function(alignment) {
  return CSS.ALIGNSETTINGS + '_' + alignment;
},

/**
* Update the alt text warning live.
*
* @method _updateWarning
* @return {boolean} whether a warning should be displayed.
* @private
*/
_updateWarning: function() {
        return false;
}
});
