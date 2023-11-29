
class Utils{
    validateEmail(email){
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }

    BlobToBase64Content(ImageData)
    {
        var str = "";
        new Uint8Array(ImageData).forEach((el)=>{
            str += String.fromCharCode(el);
        });

        return btoa(str);
    }
}

module.exports = new Utils();
