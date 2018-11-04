import { Meteor } from 'meteor/meteor';
/*import '../imports/api/people.js';*/
import '../imports/api/ocupations.js';
import '../imports/api/project.js';
import '../imports/startup/server/on-create-user.js';

Meteor.startup(() => {
  // code to run on server at startup
});
/*
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "C:\\workspace\\cinekomuna\\ck_v0.1\\public\\uploads\\"})]
});*/

Images = new FS.Collection("images", {
    filter: {
       maxSize: 5 * 1024 * 1024, //in bytes
       allow: {
         contentTypes: ['image/*']
       },
       onInvalid: function (message) {
         if (Meteor.isClient) {
           alert(message);
         } else {
           console.log(message);
         }
       }
    },
    stores: [
      new FS.Store.FileSystem("images"), //,{path: "C:\\workspace\\cinekomuna\\ck_v0.1\\public\\uploads\\"}
      new FS.Store.FileSystem("thumbs", {
        beforeWrite: function(fileObj) {
          // We return an object, which will change the
          // filename extension and type for this store only.

          return {
            extension: 'png',
            type: 'image/png'
          };
        },
        transformWrite: function(fileObj, readStream, writeStream) {
            // Transform the image into a 40x40px PNG thumbnail
            var size = "40";
            gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
          // The new file size will be automatically detected and set for this store
        }
      })
    ],
    
});

Cover = new FS.Collection("cover", {
   filter: {
       maxSize: 5 * 1024 * 1024, //in bytes
       allow: {
         contentTypes: ['image/*']
       },
       onInvalid: function (message) {
         if (Meteor.isClient) {
           alert(message);
         } else {
           console.log(message);
         }
       }
    },
    stores: [
      new FS.Store.FileSystem("cover"), // , {path: "C:\\workspace\\cinekomuna\\ck_v0.1\\public\\uploads\\"}
      new FS.Store.FileSystem("cover_min", {
        beforeWrite: function(fileObj) {
          // We return an object, which will change the
          // filename extension and type for this store only.
          return {
            extension: 'png',
            type: 'image/png'
          };
        },
        transformWrite: function(fileObj, readStream, writeStream) {
            // Transform the image into a 40x40px PNG thumbnail
            var size = "40";
            //gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
          // The new file size will be automatically detected and set for this store
        }
      })
    ]
});