define('modify', ['jquery', 'hajax', 'upload', 'form-reset'], function($, hajax, upload, formReset) {
  upload();

  formReset();
  $('#save').click(function(){



    hajax.hformAjax({
      input:{studentNumber:'studentNumber',readerEmail:'readerEmail',readerPhone:'readerPhone',readerMajor:'readerMajor',readerName:'readerName'},
      attr:{readerImgSrc:['js-upload-img','src']},
      radio:{sex:'sex',readerGroup:'hopeGroup'},
      redirect:'/hopelibrary/user'
    })
  })
});
