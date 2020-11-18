var path = require("path");
const fs = require("fs");
const fs2 = require("fs-extra");
var archiver = require("archiver");
const dirTree = require("directory-tree");

module.exports = {
  getFile: function (req, res) {
    var _path = req.query.path;
    var filePath = path.join(process.cwd(), "/public/files/", _path);
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (!err) {
        //console.log('received data: ' + data);
        res.writeHead(200, { "Content-Type": "text" });
        res.write(data);
        res.end();
      } else {
        console.log(err);
      }
    });
  },

  updateFile: function (req, res) {
    var _path = req.query.path;

    var text = req.body;
    var filePath = path.join(process.cwd(), "/public/files/", _path);

    fs.writeFile(filePath, text, function (err) {
      if (err) {
        return console.log(err);
      }
      res.status(200).json();
    });
  },

  createFile: function (req, res) {
    var _path = req.body.path;
    if (!_path.includes(".")) {
      _path = req.body.path + ".md";
    }
    var password = req.body.password;
    var filePath = path.join(process.cwd(), "/public/files/", _path);
    fs.writeFile(filePath, " ", function (err) {
      if (err) {
        return console.log(err);
      }
      res.status(201).json();
    });
  },

  deleteFile: function (req, res) {
    var _path = req.body.path;
    var password = req.body.password;
    if (!_path.includes(".")) {
      _path = req.body.path + ".md";
    }
    var filePath = path.join(process.cwd(), "/public/files/", _path);
    fs.unlink(filePath, function () {
      res.status(200).json();
    });
  },

  getStructure: function (req, res) {
    var filePath = path.join(process.cwd(), "./public");
    const tree = dirTree(
      filePath,
      { extensions: /\.md$/ },
      null,
      (item, PATH, stats) => {}
    );
    res.status(200).json(tree);
  },

  createFolder: function (req, res) {
    var dir = "./public/files/" + req.body.folderName;
    var password = req.body.password;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      res.status(201).json();
    } else {
      res.status(409).json("same folder");
    }
  },

  deleteFolder: function (req, res) {
    var dir = "./public/files/" + req.body.folderName;
    var password = req.body.password;
    if (fs2.existsSync(dir)) {
      fs2.removeSync(dir);
      res.status(200).json();
    } else {
      res.status(409).json("no folder");
    }
  },

  downloadFiles: function (req, res) {
    var output = fs.createWriteStream("./public/zip" + "/NotebookFiles.zip");
    var archive = archiver("zip", {
      zlib: { level: 9 },
    });
    var filePath = path.join(process.cwd(), "/public/files");

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );

      const file = path.resolve(
        __dirname,
        "../../public/zip/NotebookFiles.zip"
      );
      res.download(file);
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);

    // append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
    archive.directory(filePath, false);

    archive.glob("subdir/*.md");

    archive.finalize();
  },
};
