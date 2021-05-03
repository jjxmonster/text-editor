const clickedOptions = document.querySelectorAll('.toogleOption');
const textSpace = document.querySelector('#text');
const saveButton = document.querySelector('#save-button');
const uploadButton = document.querySelector('.upload-button');
const uploadInput = document.querySelector('#uploadfile');

let file;

const readFile = file => {
   const reader = new FileReader();
   reader.addEventListener('load', event => {
      const result = event.target.result;
      textSpace.textContent = JSON.parse(result);
   });
   reader.readAsText(file);
};

const formatText = (command, value) => {
   document.execCommand(command, false, value);
};

clickedOptions.forEach(item => {
   item.addEventListener('click', () => {
      item.classList.toggle('active');
      formatText(item.dataset.format);
   });
});

const handleSaveFile = async fileName => {
   const text = textSpace.textContent;
   const fileObject = {
      text,
      fileName,
   };
   const response = await fetch('/save', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileObject),
   }).then(res => {
      if (res.status === 200) {
         textSpace.textContent = '';
         window.alert('The file was saved in documents!');
      }
   });
};

const handleClick = () => {
   if (textSpace.textContent === '') {
      alert('Write something');
   } else {
      const fileName = window.prompt('Name your file', 'text');

      if (fileName == null || fileName == '') {
         return 0;
      } else {
         handleSaveFile(fileName);
      }
   }
};

uploadButton.addEventListener('click', () => {
   uploadInput.click();
});
uploadInput.addEventListener('change', () => {
   file = uploadInput.files[0];
   readFile(file);
});
saveButton.addEventListener('click', handleClick);
