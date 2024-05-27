var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/smart-collections/long_term_memory.js
var require_long_term_memory = __commonJS({
  "node_modules/smart-collections/long_term_memory.js"(exports2) {
    var LongTermMemory = class {
      /**
       * Creates an instance of LongTermMemory.
       * @param {Object} collection - The collection object containing the environment and items.
       */
      constructor(collection) {
        this.env = collection.env;
        this.brain = this.env;
        this.collection = collection;
        this.save_timeout = null;
      }
      /**
       * Static method to initialize a LongTermMemory instance using a specific adapter.
       * @param {Object} collection - The collection object to be used.
       * @param {Function} adapter - The adapter class to be instantiated.
       * @returns {LongTermMemory} An instance of the adapter class.
       */
      static wake_up(collection, adapter) {
        const ltm = new adapter(collection);
        return ltm;
      }
      /**
       * Gets the name of the collection.
       * @returns {string} The name of the collection.
       */
      get collection_name() {
        return this.collection.collection_name;
      }
      /**
       * Gets the name of the item in the collection.
       * @returns {string} The name of the item.
       */
      get item_name() {
        return this.collection.item_name;
      }
      /**
       * Gets the data path from the environment.
       * @returns {string} The data path.
       */
      get data_path() {
        return this.env.data_path;
      }
      /**
       * Gets the file name, defaulting to the collection name if not explicitly set.
       * @returns {string} The file name.
       */
      get file_name() {
        return this.collection.file_name || this.collection.collection_name;
      }
      /**
       * Constructs the full file path for the collection's data.
       * @returns {string} The full file path.
       */
      get file_path() {
        return this.data_path + "/" + this.file_name;
      }
      /**
       * Gets the items of the collection.
       * @returns {Array} The items of the collection.
       */
      get items() {
        return this.collection.items;
      }
      /**
       * Sets the items of the collection.
       * @param {Array} items - The new items of the collection.
       */
      set items(items) {
        this.collection.items = items;
      }
      /**
       * Gets the keys of the collection.
       * @returns {Array} The keys of the collection.
       */
      get keys() {
        return this.collection.keys;
      }
      /**
       * Placeholder for loading data, to be implemented by subclasses.
       */
      async load() {
      }
      /**
       * Default save method, logs a message if not overridden.
       */
      save() {
        if (this.constructor.name !== "LongTermMemory")
          console.log("called default, override me");
      }
      /**
       * Default asynchronous save method, logs a message if not overridden.
       */
      async _save() {
        if (this.constructor.name !== "LongTermMemory")
          console.log("called default, override me");
      }
      /**
       * Revives a value from a key-value pair.
       * @param {string} key - The key in the key-value pair.
       * @param {*} value - The value in the key-value pair.
       * @returns {*} The possibly transformed value.
       */
      reviver(key, value) {
        return this.collection.reviver(key, value);
      }
      /**
       * Replaces a value before it is serialized.
       * @param {string} key - The key in the key-value pair.
       * @param {*} value - The value in the key-value pair.
       * @returns {*} The possibly transformed value.
       */
      replacer(key, value) {
        return this.collection.replacer(key, value);
      }
    };
    exports2.LongTermMemory = LongTermMemory;
  }
});

// node_modules/smart-collections/ObsAJSON.js
var require_ObsAJSON = __commonJS({
  "node_modules/smart-collections/ObsAJSON.js"(exports2) {
    var { LongTermMemory } = require_long_term_memory();
    var ObsAJSON2 = class extends LongTermMemory {
      /**
       * Constructs an instance of ObsAJSON.
       * @param {Object} collection - The collection to be managed.
       */
      constructor(collection) {
        super(collection);
        this.adapter = this.env.main.app.vault.adapter;
      }
      /**
       * Asynchronously loads the collection from a JSON file.
       * Parses the file content and initializes collection items based on the stored data.
       * Handles file not found errors by creating necessary directories and files.
       */
      async load() {
        console.log("Loading: " + this.file_path);
        try {
          (await this.adapter.read(this.file_path)).split(",\n").filter((batch) => batch).forEach((batch, i) => {
            const items = JSON.parse(`{${batch}}`);
            Object.entries(items).forEach(([key, value]) => {
              this.collection.items[key] = new this.env.item_types[value.class_name](this.env, value);
            });
          });
          console.log("Loaded: " + this.file_name);
        } catch (err) {
          console.log("Error loading: " + this.file_path);
          console.log(err.stack);
          if (err.code === "ENOENT") {
            this.items = {};
            try {
              await this.adapter.mkdir(this.data_path);
              await this.adapter.write(this.file_path, "");
            } catch (creationErr) {
              console.log("Failed to create folder or file: ", creationErr);
            }
          }
        }
      }
      // wraps _save in timeout to prevent multiple saves at once
      save() {
        if (this.save_timeout)
          clearTimeout(this.save_timeout);
        this.save_timeout = setTimeout(() => {
          this._save();
        }, 1e4);
      }
      /**
       * Saves the collection to a JSON file. This method is throttled to prevent multiple saves at once.
       * @param {boolean} [force=false] - Forces the save operation even if currently saving.
       */
      async _save(force = false) {
        if (this.save_timeout)
          clearTimeout(this.save_timeout);
        this.save_timeout = null;
        if (this._saving)
          return console.log("Already saving: " + this.file_name);
        this._saving = true;
        setTimeout(() => {
          this._saving = false;
        }, 1e4);
        const start = Date.now();
        console.log("Saving: " + this.file_name);
        const temp_file_path = this.file_path.replace(".ajson", ".temp.ajson");
        if (await this.adapter.exists(temp_file_path))
          await this.adapter.remove(temp_file_path);
        try {
          await this.adapter.write(temp_file_path, "");
          let file_content = [];
          const items = Object.values(this.items).filter((i) => i.vec);
          const batches = Math.ceil(items.length / 1e3);
          for (let i = 0; i < batches; i++) {
            file_content = items.slice(i * 1e3, (i + 1) * 1e3).map((i2) => i2.ajson);
            const batch_content = file_content.join(",");
            await this.adapter.append(temp_file_path, batch_content + ",\n");
          }
          if (items.length > batches * 1e3) {
            await this.adapter.append(temp_file_path, items.slice(batches * 1e3).map((i) => i.ajson).join(",") + ",\n");
          }
          const end = Date.now();
          const time = end - start;
          if (force || await this.validate_save(temp_file_path, this.file_path)) {
            if (await this.adapter.exists(this.file_path))
              await this.adapter.remove(this.file_path);
            await this.adapter.rename(temp_file_path, this.file_path);
            console.log("Saved " + this.file_name + " in " + time + "ms");
          } else {
            console.log("Not saving " + this.file_name + " because new file is less than 50% of old file");
          }
        } catch (err) {
          console.error("Error saving: " + this.file_name);
          console.error(err.stack);
          const failed_file_path = temp_file_path.replace(".temp.", ".failed-" + Date.now() + ".");
          await this.adapter.rename(temp_file_path, failed_file_path);
        }
        this._saving = false;
        if (await this.adapter.exists(temp_file_path) && await this.adapter.exists(this.file_path))
          await this.adapter.remove(temp_file_path);
      }
      /**
       * Validates the new file size against the old file size to ensure data integrity.
       * @param {string} new_file_path - Path to the new file.
       * @param {string} old_file_path - Path to the old file.
       * @returns {Promise<boolean>} True if the new file size is more than 50% of the old file size, otherwise false.
       */
      async validate_save(new_file_path, old_file_path) {
        var _a, _b;
        const new_file_size = (_a = await this.adapter.stat(new_file_path)) == null ? void 0 : _a.size;
        const old_file_size = (_b = await this.adapter.stat(old_file_path)) == null ? void 0 : _b.size;
        if (!old_file_size)
          return true;
        console.log("New file size: " + new_file_size + " bytes");
        console.log("Old file size: " + old_file_size + " bytes");
        return new_file_size > old_file_size * 0.5;
      }
      get file_name() {
        return super.file_name + ".ajson";
      }
    };
    exports2.ObsAJSON = ObsAJSON2;
  }
});

// node_modules/smart-collections/ObsMultiAJSON.js
var require_ObsMultiAJSON = __commonJS({
  "node_modules/smart-collections/ObsMultiAJSON.js"(exports2) {
    var { LongTermMemory } = require_long_term_memory();
    var ObsMultiAJSON2 = class extends LongTermMemory {
      /**
       * Creates an instance of ObsMultiAJSON.
       * @param {Object} collection - The collection of items to be managed.
       */
      constructor(collection) {
        super(collection);
        this.adapter = this.env.main.app.vault.adapter;
      }
      /**
       * Asynchronously loads collection items from .ajson files within the specified data path.
       * It ensures that only .ajson files are processed and handles JSON parsing and item instantiation.
       */
      async load() {
        console.log("Loading collection items");
        if (!await this.adapter.exists(this.data_path))
          await this.adapter.mkdir(this.data_path);
        const files = (await this.adapter.list(this.data_path)).files;
        for (const file_path of files) {
          try {
            if (file_path.endsWith(".ajson")) {
              const content = await this.adapter.read(file_path);
              const data = JSON.parse(`{${content.endsWith(",") ? content.slice(0, -1) : content}}`);
              let pruned = "";
              Object.entries(data).forEach(([key, value]) => {
                const entity = new this.env.item_types[value.class_name](this.env, value);
                this.env[entity.collection_name].items[key] = entity;
                pruned += entity.ajson + ",\n";
              });
              await this.adapter.write(file_path, pruned.trim());
            }
          } catch (err) {
            console.log("Error loading file: " + file_path);
            console.log(err.stack);
          }
        }
        console.log("Loaded collection items");
      }
      /**
       * Schedules a save operation to prevent multiple saves happening at the same time.
       */
      save() {
        if (this.save_timeout)
          clearTimeout(this.save_timeout);
        this.save_timeout = setTimeout(() => {
          this._save();
        }, 1e4);
      }
      /**
       * Asynchronously saves modified collection items to their respective .ajson files.
       * @param {boolean} [force=false] - Forces the save operation even if it's currently flagged as saving.
       */
      async _save(force = false) {
        let saved_ct = 0;
        if (this._saving)
          return console.log("Already saving");
        this._saving = true;
        setTimeout(() => {
          this._saving = false;
        }, 1e4);
        const start = Date.now();
        console.log("Saving collection items");
        if (!await this.adapter.exists(this.data_path))
          await this.adapter.mkdir(this.data_path);
        const items = Object.values(this.items).filter((i) => i.vec && i.changed);
        if (items.length === 0) {
          this._saving = false;
          console.log("Nothing to save");
          return;
        }
        try {
          for (const item of items) {
            const item_file_path = `${this.data_path}/${item.multi_ajson_file_name}.ajson`;
            await this.adapter.append(item_file_path, "\n" + item.ajson + ",");
            saved_ct++;
          }
          const end = Date.now();
          const time = end - start;
          console.log(`Saved ${saved_ct} collection items in ${time}ms`);
        } catch (err) {
          console.error("Error saving collection items");
          console.error(err.stack);
        }
        this._saving = false;
      }
      /**
       * Validates the save operation by comparing the file sizes of the new and old files.
       * @param {string} new_file_path - Path to the new file.
       * @param {string} old_file_path - Path to the old file.
       * @returns {Promise<boolean>} - True if the new file size is at least 50% of the old file size, otherwise false.
       */
      async validate_save(new_file_path, old_file_path) {
        var _a, _b;
        const new_file_size = (_a = await this.adapter.stat(new_file_path)) == null ? void 0 : _a.size;
        const old_file_size = (_b = await this.adapter.stat(old_file_path)) == null ? void 0 : _b.size;
        if (!old_file_size)
          return true;
        console.log("New file size: " + new_file_size + " bytes");
        console.log("Old file size: " + old_file_size + " bytes");
        return new_file_size > old_file_size * 0.5;
      }
      /**
       * Gets the data path for storing .ajson files, appending '/multi' to the base path.
       * @returns {string} The data path for .ajson files.
       */
      get data_path() {
        return super.data_path + "/multi";
      }
    };
    exports2.ObsMultiAJSON = ObsMultiAJSON2;
  }
});

// node_modules/smart-collections/env.js
var require_env = __commonJS({
  "node_modules/smart-collections/env.js"(exports2) {
    var { LongTermMemory: LTM } = require_long_term_memory();
    var SmartEnv = class {
      constructor(ltm_adapter = LTM) {
        this.config = {};
        this.item_types = {};
        this.collections = {};
        this.ltm_adapter = ltm_adapter;
        this.data_path = "./test/data";
      }
      init() {
        this.load_collections();
      }
      load_collections() {
        Object.entries(this.collections).map(([collection_name, collection]) => this[collection_name] = collection.load(this));
      }
      get_ref(ref) {
        return this[ref.collection_name].get(ref.key);
      }
    };
    exports2.SmartEnv = SmartEnv;
  }
});

// node_modules/smart-collections/Brain.js
var require_Brain = __commonJS({
  "node_modules/smart-collections/Brain.js"(exports2) {
    var { SmartEnv } = require_env();
    exports2.Brain = SmartEnv;
  }
});

// node_modules/smart-chunks/SmartMarkdown.js
var require_SmartMarkdown = __commonJS({
  "node_modules/smart-chunks/SmartMarkdown.js"(exports2) {
    var SmartMarkdown = class {
      /**
       * Returns the default configuration for the SmartMarkdown parser.
       * @returns {Object} Default configuration settings.
       */
      static get defaults() {
        return {
          excluded_headings: null,
          // comma separated list of headings to exclude
          embed_input_max_chars: 1e3,
          // max length of block
          embed_input_min_chars: 50,
          // min length of block
          skip_blocks_with_headings_only: false
          // skip blocks that only contain headings
        };
      }
      /**
       * Creates an instance of SmartMarkdown with the given configuration.
       * @param {Object} config - User-defined configuration settings.
       */
      constructor(config) {
        this.config = { ...SmartMarkdown.defaults, ...config };
      }
      /**
       * Retrieves the list of headings to be excluded from parsing, if any.
       * @returns {Array|null} An array of headings to exclude, or null if none.
       */
      get excluded_headings() {
        var _a;
        ((_a = this.config.excluded_headings) == null ? void 0 : _a.length) ? this.config.excluded_headings.split(",").map((header) => header.trim()) : null;
      }
      /**
       * Analyzes the markdown content to extract metadata about each heading.
       * @param {string} content - The markdown content to analyze.
       * @returns {Array} An array of objects containing metadata about each heading.
       */
      // WIP
      get_headings_meta(content) {
        return content.split("\n").reduce((acc, line, line_i, lines) => {
          if (!this.is_heading(line))
            return acc;
          const chars_until_next_heading = lines.slice(line_i + 1).findIndex((line2) => this.is_heading(line2));
          const heading_level = line.split("#").length - 1;
          const heading_text = line.replace(/#/g, "").trim();
          acc.push = { line_i, heading_level, heading_text, chars_until_next_heading };
          return acc;
        }, []);
      }
      // v1
      // get block from path
      /**
       * Extracts a specific block of markdown based on a heading path.
       * @param {string} block_path - The path to the block, specified as a series of headings.
       * @param {string} markdown - The markdown content to parse.
       * @param {Object} opts - Options for block extraction, such as character limits per line.
       * @returns {string} The extracted block of markdown text.
       */
      get_block_from_path(block_path, markdown, opts = {}) {
        if (block_path.endsWith("#") && block_path.split("#").length === 2)
          return markdown.split("#")[0];
        if (!this.validate_block_path(block_path))
          return markdown;
        const {
          chars_per_line = null,
          max_chars = this.config.embed_input_max_chars,
          min_chars = this.config.embed_input_min_chars
        } = opts;
        const block = [];
        const block_headings = block_path.split("#").slice(1);
        let currentHeaders = [];
        let begin_line = 0;
        let is_code = false;
        let char_count = 0;
        let heading_occurrence = 0;
        let occurrence_count = 0;
        if (block_headings[block_headings.length - 1].indexOf("{") > -1) {
          heading_occurrence = parseInt(block_headings[block_headings.length - 1].split("{")[1].replace("}", ""));
          block_headings[block_headings.length - 1] = block_headings[block_headings.length - 1].split("{")[0];
        }
        const lines = markdown.split("\n");
        let block_heading_level = 0;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.indexOf("```") === 0)
            is_code = !is_code;
          if (is_code)
            continue;
          if (["- ", "- [ ] "].indexOf(line) > -1)
            continue;
          if (!this.is_heading(line))
            continue;
          block_heading_level = this.heading_level(line);
          const heading_text = line.replace(/#/g, "").trim();
          const heading_index = block_headings.indexOf(heading_text);
          if (heading_index < 0)
            continue;
          if (currentHeaders.length !== heading_index)
            continue;
          currentHeaders.push(heading_text);
          if (currentHeaders.length === block_headings.length) {
            if (heading_occurrence === 0) {
              begin_line = i + 1;
              break;
            }
            if (occurrence_count === heading_occurrence) {
              begin_line = i + 1;
              break;
            }
            occurrence_count++;
            currentHeaders.pop();
            continue;
          }
        }
        if (begin_line === 0)
          return "";
        is_code = false;
        for (let i = begin_line; i < lines.length; i++) {
          let line = lines[i];
          if (this.is_heading(line) && this.heading_level(line) <= block_heading_level)
            break;
          if (chars_per_line && line.length > chars_per_line)
            line = line.slice(0, chars_per_line) + "...";
          if (line.startsWith("```"))
            is_code = !is_code;
          block.push(line);
          char_count += line.length;
          if (max_chars && char_count > max_chars) {
            const diff = char_count - max_chars;
            block[block.length - 1] = block[block.length - 1].slice(0, block[block.length - 1].length - diff) + "...";
            break;
          }
          if (max_chars && max_chars - char_count < 10)
            break;
        }
        if (is_code)
          block.push("```");
        return block.join("\n").trim();
      }
      /**
       * Parses the markdown content and organizes it into structured blocks based on headings.
       * @param {Object} params - Parameters containing content and optional file path.
       * @returns {Object} An object containing parsed blocks and other metadata.
       */
      parse({ content, file_path = "" }) {
        const file_breadcrumbs = this.file_path_to_breadcrumbs(file_path) + ": ";
        if (file_path.endsWith(".excalidraw.md")) {
          const excalidraw_block = this.get_block_from_path(file_path + "#Text Elements", content).replace("\n%%", "");
          return {
            blocks: [
              {
                text: excalidraw_block,
                path: file_path + "#Text Elements",
                length: excalidraw_block.length,
                heading: "Text Elements"
              }
            ],
            log: []
          };
        }
        const output = content.split("\n").reduce((acc, line, i, arr) => {
          if (this.is_heading(line) && (!acc.curr_level || !this.config.multi_heading_blocks || this.heading_level(line) <= acc.curr_level || acc.curr.length > this.config.embed_input_max_chars)) {
            this.output_block(acc);
            acc.curr_level = this.heading_level(line);
            acc.current_headers = acc.current_headers.filter((header) => header.level < acc.curr_level);
            acc.current_headers.push({ header: line.replace(/#/g, "").trim(), level: acc.curr_level });
            acc.start_line = i;
            acc.curr = file_breadcrumbs;
            acc.curr += acc.current_headers.map((header) => header.header).join(" > ");
            acc.block_headings = "#" + acc.current_headers.map((header) => header.header).join("#");
            this.handle_duplicate_headings(acc);
            acc.block_headings_list.push(acc.block_headings);
            acc.block_path = file_path + acc.block_headings;
            acc.curr_heading = line.replace(/#/g, "").trim();
            return acc;
          }
          if (this.is_content_line(line)) {
            if (acc.curr.indexOf("\n") === -1)
              acc.curr += ":";
            acc.curr += "\n" + line;
            acc.curr_line = i;
          }
          if (i === arr.length - 1)
            this.output_block(acc);
          return acc;
        }, { block_headings: "", block_headings_list: [], block_path: file_path + "#", curr: file_breadcrumbs, current_headers: [], blocks: [], log: [], start_line: 0, curr_line: 0, curr_heading: null });
        return {
          ...output,
          file_path,
          // remove properties that are exclusive to the reduce function
          block_headings: void 0,
          block_headings_list: void 0,
          block_path: void 0,
          curr: void 0,
          current_headers: void 0
        };
      }
      /**
       * Handles duplicate headings by appending a unique identifier to the heading path.
       * @param {Object} acc - The accumulator object used in reduce function.
       */
      // if block_headings is already in block_headings_list then add a number to the end
      handle_duplicate_headings(acc) {
        if (!acc.block_headings_list.includes(acc.block_headings))
          return;
        let count = 1;
        const uniqueHeadings = new Set(acc.block_headings_list);
        while (uniqueHeadings.has(`${acc.block_headings}{${count}}`)) {
          count++;
        }
        acc.block_headings = `${acc.block_headings}{${count}}`;
      }
      /**
       * Outputs the current block into the structured blocks array after validation.
       * @param {Object} acc - The accumulator object used in reduce function.
       */
      // push the current block to the blocks array
      output_block(acc) {
        const { embed_input_max_chars, embed_input_min_chars } = this.config;
        if (acc.curr.indexOf("\n") === -1)
          return acc.log.push(`Skipping empty block: ${acc.curr}`);
        if (!this.validate_heading(acc.block_headings))
          return acc.log.push(`Skipping excluded heading: ${acc.block_headings}`);
        if (acc.curr.length > embed_input_max_chars)
          acc.curr = acc.curr.substring(0, embed_input_max_chars);
        const breadcrumbs_length = acc.curr.indexOf("\n") + 1;
        const block_length = acc.curr.length - breadcrumbs_length;
        if (block_length < embed_input_min_chars)
          return acc.log.push(`Skipping block shorter than min length: ${acc.curr}`);
        if (this.config.skip_blocks_with_headings_only) {
          const block_lines = acc.curr.split("\n");
          const block_headings = block_lines.slice(1).filter((line) => this.is_heading(line));
          if (block_headings.length === block_lines.length - 1)
            return acc.log.push(`Skipping block with only headings: ${acc.curr}`);
        }
        acc.blocks.push({
          text: acc.curr.trim(),
          path: acc.block_path,
          length: block_length,
          heading: acc.curr_heading,
          lines: [acc.start_line, acc.curr_line]
        });
      }
      /**
       * Determines if a line of text should be considered as content.
       * @param {string} line - The line of text to evaluate.
       * @returns {boolean} True if the line is content, false otherwise.
       */
      is_content_line(line) {
        if (["- ", "- [ ] "].indexOf(line) > -1)
          return false;
        return true;
      }
      /**
       * Converts a file path to a breadcrumb string format.
       * @param {string} file_path - The file path to convert.
       * @returns {string} The breadcrumb string.
       */
      file_path_to_breadcrumbs(file_path) {
        return file_path.replace(".md", "").split("/").map((crumb) => crumb.trim()).filter((crumb) => crumb !== "").join(" > ");
      }
      // remove .md file extension and convert file_path to breadcrumb formatting
      /**
       * Determines the level of a heading based on the number of '#' characters.
       * @param {string} line - The heading line to evaluate.
       * @returns {number} The level of the heading.
       */
      heading_level(line) {
        return line.split("#").length - 1;
      }
      /**
       * Checks if a line is a heading.
       * @param {string} line - The line to check.
       * @returns {boolean} True if the line is a heading, false otherwise.
       * @param {string} line - The line to check.
       * @returns {boolean} True if the line is a heading, false otherwise.
      */
      is_heading(line) {
        return line.startsWith("#") && ["#", " "].indexOf(line[1]) > -1;
      }
      // check if line is a heading (starts with # and second character is space or # indicating not a tag)
      /**
       * Validates if the block path is correctly formatted to include at least one heading.
       * @param {string} block_path - The block path to validate.
       * @returns {boolean} True if the block path is valid, false otherwise.
       */
      validate_block_path(block_path) {
        return block_path.indexOf("#") > -1;
      }
      // validate block_path contains at least one "#"
      /**
       * Validates a heading against the list of excluded headings.
       * @param {string} headings - The heading to validate.
       * @returns {boolean} True if the heading is not excluded, false if it is.
       */
      validate_heading(headings) {
        var _a;
        return !!!((_a = this.excluded_headings) == null ? void 0 : _a.some((exclusion) => headings.indexOf(exclusion) > -1));
      }
      // validate heading against excluded headings
    };
    exports2.SmartMarkdown = SmartMarkdown;
  }
});

// node_modules/smart-chunks/smart-chunks.js
var require_smart_chunks = __commonJS({
  "node_modules/smart-chunks/smart-chunks.js"(exports2) {
    var { SmartMarkdown } = require_SmartMarkdown();
    exports2.SmartMarkdown = SmartMarkdown;
  }
});

// node_modules/smart-collections/helpers.js
var require_helpers = __commonJS({
  "node_modules/smart-collections/helpers.js"(exports2) {
    function create_uid(data) {
      const str = JSON.stringify(data);
      let hash = 0;
      if (str.length === 0)
        return hash;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
        if (hash < 0)
          hash = hash * -1;
      }
      return hash.toString() + str.length;
    }
    exports2.create_uid = create_uid;
    function deep_merge(target, source) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (is_obj(source[key]) && is_obj(target[key]))
            deep_merge(target[key], source[key]);
          else
            target[key] = source[key];
        }
      }
      return target;
      function is_obj(item) {
        return item && typeof item === "object" && !Array.isArray(item);
      }
    }
    exports2.deep_merge = deep_merge;
    function collection_instance_name_from(class_name) {
      return class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/y$/, "ie") + "s";
    }
    exports2.collection_instance_name_from = collection_instance_name_from;
    function cos_sim(vector1, vector2) {
      const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
      const normA = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
      const normB = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
      return normA === 0 || normB === 0 ? 0 : dotProduct / (normA * normB);
    }
    exports2.cos_sim = cos_sim;
    function top_acc(_acc, item, ct = 10) {
      if (_acc.items.size < ct) {
        _acc.items.add(item);
      } else if (item.sim > _acc.min) {
        _acc.items.add(item);
        _acc.items.delete(_acc.minItem);
        _acc.minItem = Array.from(_acc.items).reduce((min, curr) => curr.sim < min.sim ? curr : min);
        _acc.min = _acc.minItem.sim;
      }
    }
    exports2.top_acc = top_acc;
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    exports2.sleep = sleep;
  }
});

// node_modules/smart-collections/CollectionItem.js
var require_CollectionItem = __commonJS({
  "node_modules/smart-collections/CollectionItem.js"(exports2) {
    var helpers = require_helpers();
    var {
      create_uid,
      deep_merge,
      collection_instance_name_from
    } = helpers;
    var CollectionItem = class {
      /**
       * Default properties for an instance of CollectionItem.
       * @returns {Object} Default data configuration.
       */
      static get defaults() {
        return {
          data: {
            key: null
          }
        };
      }
      /**
       * Creates an instance of CollectionItem.
       * @param {Object} brain - The central storage or context.
       * @param {Object|null} data - Initial data for the item.
       */
      constructor(env, data = null) {
        var _a;
        this.env = env;
        this.brain = this.env;
        this.config = (_a = this.env) == null ? void 0 : _a.config;
        this.merge_defaults();
        if (data)
          this.data = data;
        if (!this.data.class_name)
          this.data.class_name = this.constructor.name;
      }
      /**
       * Merges default properties from all classes in the inheritance chain.
       */
      merge_defaults() {
        let current_class = this.constructor;
        while (current_class) {
          for (let key in current_class.defaults) {
            if (typeof current_class.defaults[key] === "object")
              this[key] = { ...current_class.defaults[key], ...this[key] };
            else
              this[key] = current_class.defaults[key];
          }
          current_class = Object.getPrototypeOf(current_class);
        }
      }
      /**
       * Generates or retrieves a unique key for the item. Can be overridden in child classes.
       * @returns {string} The unique key.
       */
      get_key() {
        console.log("called default get_key");
        return create_uid(this.data);
      }
      // update_data - for data in this.data
      /**
       * Updates the data of this item with new data.
       * @param {Object} data - The new data for the item.
       * @returns {boolean} True if data was successfully updated.
       */
      update_data(data) {
        data = JSON.parse(JSON.stringify(data, this.update_data_replacer));
        deep_merge(this.data, data);
        return true;
      }
      /**
       * Custom replacer function for JSON.stringify used in update_data to handle special object types.
       * @param {string} key - The key of the property being stringified.
       * @param {any} value - The value of the property being stringified.
       * @returns {any} The value to be used in the JSON string.
       */
      update_data_replacer(key, value) {
        if (value instanceof CollectionItem)
          return value.ref;
        if (Array.isArray(value))
          return value.map((val) => val instanceof CollectionItem ? val.ref : val);
        return value;
      }
      // init - for data not in this.data
      /**
       * Initializes the item with input_data, potentially asynchronously.
       * Handles interactions with other collection items.
       */
      init() {
        this.save();
      }
      // should always call this.save() in child class init() overrides
      /**
       * Saves the current state of the item to its collection.
       */
      save() {
        if (!this.validate_save()) {
          if (this.key)
            this.collection.delete(this.key);
          return console.error("Invalid save: ", { data: this.data, stack: new Error().stack });
        }
        this.collection.set(this);
        this.collection.save();
      }
      /**
       * Validates the item's data before saving.
       * @returns {boolean} True if the data is valid for saving.
       */
      validate_save() {
        if (!this.key)
          return false;
        if (this.key === "")
          return false;
        if (this.key === "undefined")
          return false;
        return true;
      }
      /**
       * Deletes the item from its collection.
       */
      delete() {
        this.collection.delete(this.key);
      }
      // functional filter (returns true or false) for filtering items in collection; called by collection class
      /**
       * Filters items in the collection based on provided options.
       * @param {Object} opts - Filtering options.
       * @returns {boolean} True if the item passes the filter.
       */
      filter(opts = {}) {
        const {
          exclude_key,
          exclude_keys = exclude_key ? [exclude_key] : [],
          exclude_key_starts_with,
          key_ends_with,
          key_starts_with,
          key_starts_with_any
        } = opts;
        if (exclude_keys == null ? void 0 : exclude_keys.includes(this.key))
          return false;
        if (exclude_key_starts_with && this.key.startsWith(exclude_key_starts_with))
          return false;
        if (key_ends_with && !this.key.endsWith(key_ends_with))
          return false;
        if (key_starts_with && !this.key.startsWith(key_starts_with))
          return false;
        if (key_starts_with_any && !key_starts_with_any.some((prefix) => this.key.startsWith(prefix)))
          return false;
        return true;
      }
      /**
       * Parses the item's data for any necessary processing or transformation. Placeholder for override in child classes.
       */
      parse() {
      }
      /**
       * Retrieves the collection name derived from the class name.
       * @returns {string} The collection name.
       */
      static get collection_name() {
        return collection_instance_name_from(this.name);
      }
      /**
       * Retrieves the collection name for the instance, either from data or the class method.
       * @returns {string} The collection name.
       */
      get collection_name() {
        return this.data.collection_name ? this.data.collection_name : collection_instance_name_from(this.data.class_name || this.constructor.name);
      }
      /**
       * Retrieves the collection this item belongs to.
       * @returns {Object} The collection object.
       */
      get collection() {
        return this.env[this.collection_name];
      }
      /**
       * Retrieves or generates the key for this item.
       * @returns {string} The item's key.
       */
      get key() {
        return this.data.key = this.data.key || this.get_key();
      }
      /**
       * Provides a reference object for this item, containing the collection name and key.
       * @returns {Object} The reference object.
       */
      get ref() {
        return { collection_name: this.collection_name, key: this.key };
      }
      /**
       * Retrieves the sequence key for this item, used for building sequence keys.
       * @returns {string} The sequence key.
       */
      get seq_key() {
        return this.key;
      }
      // used for building sequence keys
    };
    exports2.CollectionItem = CollectionItem;
  }
});

// node_modules/smart-collections/Collection.js
var require_Collection = __commonJS({
  "node_modules/smart-collections/Collection.js"(exports2) {
    var { CollectionItem } = require_CollectionItem();
    var AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    var helpers = require_helpers();
    var { deep_merge } = helpers;
    var Collection = class {
      /**
       * Constructs a new Collection instance.
       * @param {Object} env - The environment context containing configurations and adapters.
       */
      constructor(env) {
        this.env = env;
        this.brain = this.env;
        this.config = this.env.config;
        this.items = {};
        this.LTM = this.env.ltm_adapter.wake_up(this, this.env.ltm_adapter);
      }
      /**
       * Loads a collection based on the environment and optional configuration.
       * @param {Object} env - The environment context.
       * @param {Object} [config={}] - Optional configuration for the collection.
       * @returns {Promise<Collection>|Collection} The loaded collection instance.
       */
      static load(env, config = {}) {
        const { custom_collection_name } = config;
        env[this.collection_name] = new this(env);
        if (custom_collection_name) {
          env[this.collection_name].collection_name = custom_collection_name;
          env.collections[custom_collection_name] = this.constructor;
        }
        env[this.collection_name].merge_defaults();
        if (env[this.collection_name].load instanceof AsyncFunction)
          return env[this.collection_name].load().then(() => env[this.collection_name]);
        else
          env[this.collection_name].load();
        return env[this.collection_name];
      }
      /**
       * Merges default configurations from all classes in the inheritance chain.
       */
      merge_defaults() {
        var _a, _b;
        let current_class = this.constructor;
        while (current_class) {
          const col_conf = (_b = (_a = this.config) == null ? void 0 : _a.collections) == null ? void 0 : _b[current_class.collection_name];
          Object.entries(typeof col_conf === "object" ? col_conf : {}).forEach(([key, value]) => this[key] = value);
          current_class = Object.getPrototypeOf(current_class);
        }
      }
      /**
       * Saves the current state of the collection.
       */
      save() {
        this.LTM.save();
      }
      /**
       * Loads the collection state.
       */
      load() {
        this.LTM.load();
      }
      /**
       * Revives items from a serialized state.
       * @param {string} key - The key of the item.
       * @param {*} value - The serialized item value.
       * @returns {CollectionItem|*} The revived item or the original value if not an object.
       */
      reviver(key, value) {
        if (typeof value !== "object" || value === null)
          return value;
        if (value.class_name)
          return new this.env.item_types[value.class_name](this.env, value);
        return value;
      }
      replacer(key, value) {
        if (value instanceof this.item_type)
          return value.data;
        if (value instanceof CollectionItem)
          return value.ref;
        return value;
      }
      /**
       * Creates or updates an item in the collection based on the provided data.
       * @param {Object} data - The data to create or update an item.
       * @returns {Promise<CollectionItem>|CollectionItem} The newly created or updated item.
       */
      create_or_update(data = {}) {
        const existing = this.find_by(data);
        const item = existing ? existing : new this.item_type(this.env);
        item.is_new = !!!existing;
        const changed = item.update_data(data);
        if (existing && !changed)
          return existing;
        if (item.validate_save())
          this.set(item);
        if (item.init instanceof AsyncFunction)
          return new Promise((resolve, reject) => {
            item.init(data).then(() => resolve(item));
          });
        item.init(data);
        return item;
      }
      /**
       * Finds an item in the collection that matches the given data.
       * @param {Object} data - The criteria used to find the item.
       * @returns {CollectionItem|null} The found item or null if not found.
       */
      find_by(data) {
        if (data.key)
          return this.get(data.key);
        const temp = new this.item_type(this.env);
        const temp_data = JSON.parse(JSON.stringify(data, temp.update_data_replacer));
        deep_merge(temp.data, temp_data);
        return temp.key ? this.get(temp.key) : null;
      }
      // READ
      /**
       * Filters the items in the collection based on the provided options.
       * @param {Object} opts - The options used to filter the items.
       * @return {CollectionItem[]} The filtered items.
       */
      filter(opts) {
        return Object.entries(this.items).filter(([key, item]) => item.filter(opts)).map(([key, item]) => item);
      }
      /**
       * Retrieves items from the collection based on the provided strategy and options.
       * @param {Function[]} strategy - The strategy used to retrieve the items.
       * @param {Object} opts - The options used to retrieve the items.
       * @return {CollectionItem[]} The retrieved items.
       * @throws {Error} Throws an error if any function in the strategy array is not actually a function or if an async function throws an error.
       */
      async retrieve(strategy = [], opts = {}) {
        return await sequential_async_processor(funcs, this.filter(opts), opts);
      }
      /**
       * Retrieves a single item from the collection based on the provided strategy and options.
       * @param {String} key - The key of the item to retrieve.
       * @return {CollectionItem} The retrieved item.
       */
      get(key) {
        return this.items[key];
      }
      /**
       * Retrieves multiple items from the collection based on the provided keys.
       * @param {String[]} keys - The keys of the items to retrieve.
       * @return {CollectionItem[]} The retrieved items.
       */
      get_many(keys = []) {
        if (Array.isArray(keys))
          return keys.map((key) => this.get(key));
        console.error("get_many called with non-array keys: ", keys);
      }
      /**
       * Retrieves a random item from the collection based on the provided options.
       * @param {Object} opts - The options used to retrieve the item.
       * @return {CollectionItem} The retrieved item.
       */
      get_rand(opts = null) {
        if (opts) {
          const filtered = this.filter(opts);
          return filtered[Math.floor(Math.random() * filtered.length)];
        }
        return this.items[this.keys[Math.floor(Math.random() * this.keys.length)]];
      }
      // UPDATE
      /**
       * Adds or updates an item in the collection.
       * @param {CollectionItem} item - The item to add or update.
       */
      set(item) {
        if (!item.key)
          throw new Error("Item must have key property");
        this.items[item.key] = item;
      }
      /**
       * Updates multiple items in the collection based on the provided keys and data.
       * @param {String[]} keys - The keys of the items to update.
       * @param {Object} data - The data to update the items with.
       */
      update_many(keys = [], data = {}) {
        this.get_many(keys).forEach((item) => item.update_data(data));
      }
      // DESTROY
      /**
       * Clears all items from the collection.
       */
      clear() {
        this.items = {};
      }
      /**
       * Deletes an item from the collection based on its key.
       * @param {String} key - The key of the item to delete.
       */
      delete(key) {
        delete this.items[key];
      }
      /**
       * Deletes multiple items from the collection based on their keys.
       * @param {String[]} keys - The keys of the items to delete.
       */
      delete_many(keys = []) {
        keys.forEach((key) => delete this.items[key]);
      }
      // CONVENIENCE METHODS (namespace getters)
      /**
       * Gets the collection name derived from the class name.
       * @return {String} The collection name.
       */
      static get collection_name() {
        return this.name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      }
      /**
       * Gets or sets the collection name. If a name is set, it overrides the default name.
       * @param {String} name - The new collection name.
       */
      get collection_name() {
        return this._collection_name ? this._collection_name : this.constructor.collection_name;
      }
      set collection_name(name) {
        this._collection_name = name;
      }
      /**
       * Gets the keys of the items in the collection.
       * @return {String[]} The keys of the items.
       */
      get keys() {
        return Object.keys(this.items);
      }
      /**
       * Gets the class name of the item type the collection manages.
       * @return {String} The item class name.
       */
      get item_class_name() {
        return this.constructor.name.slice(0, -1).replace(/(ie)$/g, "y");
      }
      // remove 's' from end of name & if name ends in 'ie', replace with 'y'
      /**
       * Gets the name of the item type the collection manages, derived from the class name.
       * @return {String} The item name.
       */
      get item_name() {
        return this.item_class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      }
      /**
       * Gets the constructor of the item type the collection manages.
       * @return {Function} The item type constructor.
       */
      get item_type() {
        return this.env.item_types[this.item_class_name];
      }
    };
    exports2.Collection = Collection;
    async function sequential_async_processor(funcs2, initial_value, opts = {}) {
      let value = initial_value;
      for (const func of funcs2) {
        if (typeof func !== "function") {
          throw new TypeError("All elements in async_functions array must be functions");
        }
        try {
          value = await func(value, opts);
        } catch (error) {
          throw error;
        }
      }
      return value;
    }
    exports2.sequential_async_processor = sequential_async_processor;
  }
});

// node_modules/smart-embed-model/adapters/adapter.js
var require_adapter = __commonJS({
  "node_modules/smart-embed-model/adapters/adapter.js"(exports2) {
    var Adapter = class {
      /**
       * Constructs an instance of Adapter.
       * @param {object} main - The main context object which should contain a configuration object.
       */
      constructor(main) {
        this.main = main;
        Object.assign(this, main.config);
      }
    };
    exports2.Adapter = Adapter;
  }
});

// node_modules/smart-embed-model/node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/smart-embed-model/node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/smart-embed-model/node_modules/js-tiktoken/dist/lite.cjs
var require_lite = __commonJS({
  "node_modules/smart-embed-model/node_modules/js-tiktoken/dist/lite.cjs"(exports2) {
    "use strict";
    var base64 = require_base64_js();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var base64__default = /* @__PURE__ */ _interopDefault(base64);
    var __defProp2 = Object.defineProperty;
    var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField2 = (obj, key, value) => {
      __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    function bytePairMerge(piece, ranks) {
      let parts = Array.from(
        { length: piece.length },
        (_, i) => ({ start: i, end: i + 1 })
      );
      while (parts.length > 1) {
        let minRank = null;
        for (let i = 0; i < parts.length - 1; i++) {
          const slice = piece.slice(parts[i].start, parts[i + 1].end);
          const rank = ranks.get(slice.join(","));
          if (rank == null)
            continue;
          if (minRank == null || rank < minRank[0]) {
            minRank = [rank, i];
          }
        }
        if (minRank != null) {
          const i = minRank[1];
          parts[i] = { start: parts[i].start, end: parts[i + 1].end };
          parts.splice(i + 1, 1);
        } else {
          break;
        }
      }
      return parts;
    }
    function bytePairEncode(piece, ranks) {
      if (piece.length === 1)
        return [ranks.get(piece.join(","))];
      return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
    }
    function escapeRegex(str) {
      return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var _Tiktoken = class {
      constructor(ranks, extendedSpecialTokens) {
        /** @internal */
        __publicField(this, "specialTokens");
        /** @internal */
        __publicField(this, "inverseSpecialTokens");
        /** @internal */
        __publicField(this, "patStr");
        /** @internal */
        __publicField(this, "textEncoder", new TextEncoder());
        /** @internal */
        __publicField(this, "textDecoder", new TextDecoder("utf-8"));
        /** @internal */
        __publicField(this, "rankMap", /* @__PURE__ */ new Map());
        /** @internal */
        __publicField(this, "textMap", /* @__PURE__ */ new Map());
        this.patStr = ranks.pat_str;
        const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
          const [_, offsetStr, ...tokens] = x.split(" ");
          const offset = Number.parseInt(offsetStr, 10);
          tokens.forEach((token, i) => memo[token] = offset + i);
          return memo;
        }, {});
        for (const [token, rank] of Object.entries(uncompressed)) {
          const bytes = base64__default.default.toByteArray(token);
          this.rankMap.set(bytes.join(","), rank);
          this.textMap.set(rank, bytes);
        }
        this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
        this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
          memo[rank] = this.textEncoder.encode(text);
          return memo;
        }, {});
      }
      encode(text, allowedSpecial = [], disallowedSpecial = "all") {
        var _a;
        const regexes = new RegExp(this.patStr, "ug");
        const specialRegex = _Tiktoken.specialTokenRegex(
          Object.keys(this.specialTokens)
        );
        const ret = [];
        const allowedSpecialSet = new Set(
          allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
        );
        const disallowedSpecialSet = new Set(
          disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
            (x) => !allowedSpecialSet.has(x)
          ) : disallowedSpecial
        );
        if (disallowedSpecialSet.size > 0) {
          const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
            ...disallowedSpecialSet
          ]);
          const specialMatch = text.match(disallowedSpecialRegex);
          if (specialMatch != null) {
            throw new Error(
              `The text contains a special token that is not allowed: ${specialMatch[0]}`
            );
          }
        }
        let start = 0;
        while (true) {
          let nextSpecial = null;
          let startFind = start;
          while (true) {
            specialRegex.lastIndex = startFind;
            nextSpecial = specialRegex.exec(text);
            if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
              break;
            startFind = nextSpecial.index + 1;
          }
          const end = (_a = nextSpecial == null ? void 0 : nextSpecial.index) != null ? _a : text.length;
          for (const match of text.substring(start, end).matchAll(regexes)) {
            const piece = this.textEncoder.encode(match[0]);
            const token2 = this.rankMap.get(piece.join(","));
            if (token2 != null) {
              ret.push(token2);
              continue;
            }
            ret.push(...bytePairEncode(piece, this.rankMap));
          }
          if (nextSpecial == null)
            break;
          let token = this.specialTokens[nextSpecial[0]];
          ret.push(token);
          start = nextSpecial.index + nextSpecial[0].length;
        }
        return ret;
      }
      decode(tokens) {
        var _a;
        const res = [];
        let length = 0;
        for (let i2 = 0; i2 < tokens.length; ++i2) {
          const token = tokens[i2];
          const bytes = (_a = this.textMap.get(token)) != null ? _a : this.inverseSpecialTokens[token];
          if (bytes != null) {
            res.push(bytes);
            length += bytes.length;
          }
        }
        const mergedArray = new Uint8Array(length);
        let i = 0;
        for (const bytes of res) {
          mergedArray.set(bytes, i);
          i += bytes.length;
        }
        return this.textDecoder.decode(mergedArray);
      }
    };
    var Tiktoken = _Tiktoken;
    __publicField2(Tiktoken, "specialTokenRegex", (tokens) => {
      return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
    });
    function getEncodingNameForModel(model) {
      switch (model) {
        case "gpt2": {
          return "gpt2";
        }
        case "code-cushman-001":
        case "code-cushman-002":
        case "code-davinci-001":
        case "code-davinci-002":
        case "cushman-codex":
        case "davinci-codex":
        case "davinci-002":
        case "text-davinci-002":
        case "text-davinci-003": {
          return "p50k_base";
        }
        case "code-davinci-edit-001":
        case "text-davinci-edit-001": {
          return "p50k_edit";
        }
        case "ada":
        case "babbage":
        case "babbage-002":
        case "code-search-ada-code-001":
        case "code-search-babbage-code-001":
        case "curie":
        case "davinci":
        case "text-ada-001":
        case "text-babbage-001":
        case "text-curie-001":
        case "text-davinci-001":
        case "text-search-ada-doc-001":
        case "text-search-babbage-doc-001":
        case "text-search-curie-doc-001":
        case "text-search-davinci-doc-001":
        case "text-similarity-ada-001":
        case "text-similarity-babbage-001":
        case "text-similarity-curie-001":
        case "text-similarity-davinci-001": {
          return "r50k_base";
        }
        case "gpt-3.5-turbo-instruct-0914":
        case "gpt-3.5-turbo-instruct":
        case "gpt-3.5-turbo-16k-0613":
        case "gpt-3.5-turbo-16k":
        case "gpt-3.5-turbo-0613":
        case "gpt-3.5-turbo-0301":
        case "gpt-3.5-turbo":
        case "gpt-4-32k-0613":
        case "gpt-4-32k-0314":
        case "gpt-4-32k":
        case "gpt-4-0613":
        case "gpt-4-0314":
        case "gpt-4":
        case "gpt-3.5-turbo-1106":
        case "gpt-35-turbo":
        case "gpt-4-1106-preview":
        case "gpt-4-vision-preview":
        case "gpt-3.5-turbo-0125":
        case "gpt-4-turbo":
        case "gpt-4-turbo-2024-04-09":
        case "gpt-4-turbo-preview":
        case "gpt-4-0125-preview":
        case "text-embedding-ada-002": {
          return "cl100k_base";
        }
        default:
          throw new Error("Unknown model");
      }
    }
    exports2.Tiktoken = Tiktoken;
    exports2.getEncodingNameForModel = getEncodingNameForModel;
  }
});

// node_modules/smart-embed-model/cl100k_base.json
var require_cl100k_base = __commonJS({
  "node_modules/smart-embed-model/cl100k_base.json"(exports2, module2) {
  }
});

// node_modules/smart-embed-model/adapters/api.js
var require_api = __commonJS({
  "node_modules/smart-embed-model/adapters/api.js"(exports2) {
    var { Adapter } = require_adapter();
    var { Tiktoken } = require_lite();
    var cl100k_base = require_cl100k_base();
    var ApiAdapter = class extends Adapter {
      /**
       * Counts the number of tokens in the input.
       * Override in child classes to implement third-party token counters.
       * @param {string} input - The input to count tokens for.
       * @returns {Promise<number>} The number of tokens in the input.
       */
      count_tokens(input) {
        if (!this.enc)
          this.enc = new Tiktoken(cl100k_base);
        const tokens = this.enc.encode(input).length;
        return tokens;
      }
      /**
       * Estimates the number of tokens in the input.
       * @param {string|object} input - The input to estimate tokens for.
       * @returns {number} The estimated number of tokens.
       */
      estimate_tokens(input) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.estimate_tokens) === "function")
          return this.adapter.estimate_tokens(input);
        if (typeof input === "object")
          input = JSON.stringify(input);
        return input.length / 3.7;
      }
      /**
       * Gets the maximum number of characters allowed in the input based on max_tokens.
       * @returns {number} The maximum number of characters.
       */
      get max_chars() {
        return this.max_tokens * 4 - 100;
      }
      /**
       * Embeds the input and returns the first embedding.
       * @param {string} input - The input to embed.
       * @returns {Promise<object>} The first embedding object.
       */
      async embed(input) {
        if (!(input == null ? void 0 : input.length))
          return console.log("input is empty");
        input = this.prepare_embed_input(input);
        const embeddings = await this.request_embedding(input);
        return embeddings[0];
      }
      /**
       * Embeds a batch of items and returns their embeddings.
       * @param {Array} items - The items to embed.
       * @returns {Promise<Array>} The embeddings of the items.
       */
      async embed_batch(items) {
        items = items.filter((item) => {
          var _a;
          return ((_a = item.embed_input) == null ? void 0 : _a.length) > 0;
        });
        if (items.length === 0)
          return console.log("empty batch (or all items have empty embed_input)");
        const embed_inputs = this.prepare_batch_input(items);
        let embeddings = await this.request_embedding(embed_inputs);
        if (!embeddings)
          return console.error(items);
        embeddings = embeddings.map((embedding, i) => this.parse_embedding_output(embed_inputs, embedding, i));
        return items.map((item, i) => {
          item.vec = embeddings[i].vec;
          item.tokens = embeddings[i].tokens;
          return item;
        });
      }
      /**
       * Parses the embedding output for each input.
       * @param {Array} embed_inputs - The inputs used for embedding.
       * @param {object} embedding - The embedding result.
       * @param {number} i - The index of the current embedding.
       * @returns {object} The parsed embedding output.
       */
      parse_embedding_output(embed_inputs, embedding, i) {
        const total_chars = this.count_embed_input_chars(embed_inputs);
        return {
          vec: embedding.vec,
          tokens: Math.round(embed_inputs[i].length / total_chars * embedding.tokens)
        };
      }
      /**
       * Counts the total number of characters in all embed inputs.
       * @param {Array} embed_inputs - The inputs used for embedding.
       * @returns {number} The total number of characters.
       */
      count_embed_input_chars(embed_inputs) {
        return embed_inputs.reduce((acc, curr) => acc + curr.length, 0);
      }
      /**
       * Prepares the batch input by processing each item's embed input.
       * @param {Array} items - The items to prepare.
       * @returns {Array} The prepared batch input.
       */
      prepare_batch_input(items) {
        return items.map((item) => this.prepare_embed_input(item.embed_input));
      }
      /**
       * Prepares the embed input by truncating it if necessary.
       * @param {string} embed_input - The input to prepare.
       * @returns {string} The prepared embed input.
       */
      prepare_embed_input(embed_input) {
        const tokens_ct = this.count_tokens(embed_input);
        if (tokens_ct < this.max_tokens)
          return embed_input;
        const reduce_rt = (tokens_ct - this.max_tokens) / tokens_ct;
        embed_input = embed_input.slice(0, embed_input.length - Math.floor(embed_input.length * reduce_rt) - 100);
        return this.prepare_embed_input(embed_input);
      }
      /**
       * Prepares the request body for embedding.
       * @param {string[]} embed_input - The input to embed.
       * @returns {object} The prepared request body.
       */
      prepare_request_body(embed_input) {
        const body = {
          model: this.model_name,
          input: embed_input
        };
        if (this.model_name.startsWith("text-embedding-3")) {
          body.dimensions = this.dims;
        }
        return body;
      }
      /**
       * Prepares the request headers for the API call.
       * @returns {object} The prepared request headers.
       */
      prepare_request_headers() {
        let headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.api_key}`
        };
        if (this.headers)
          headers = { ...headers, ...this.headers };
        return headers;
      }
      /**
       * Requests the embedding from the API.
       * @param {string|string[]} embed_input - The input to embed. May be a string or an array of strings.
       * @returns {Promise<object[]>} The embedding objects {vec, tokens}.
       */
      async request_embedding(embed_input) {
        if (embed_input.length === 0) {
          console.log("embed_input is empty");
          return null;
        }
        const request2 = {
          url: this.endpoint,
          method: "POST",
          body: JSON.stringify(this.prepare_request_body(embed_input)),
          headers: this.prepare_request_headers()
        };
        const resp = await this.request(request2);
        return this.parse_response(resp);
      }
      /**
       * Parses the response from the API.
       * @param {object} resp - The response from the API.
       * @returns {Array} The parsed response data.
       */
      parse_response(resp) {
        return resp.data.map((item) => ({
          vec: item.embedding,
          tokens: resp.usage.total_tokens
        }));
      }
      /**
       * Checks if the response JSON indicates an error.
       * @param {object} resp_json - The response JSON to check.
       * @returns {boolean} True if there is an error, false otherwise.
       */
      is_error(resp_json) {
        return !resp_json.data || !resp_json.usage;
      }
      /**
       * Retrieves the JSON from the response.
       * @param {Response} resp - The response object.
       * @returns {Promise<object>} The response JSON.
       */
      async get_resp_json(resp) {
        return typeof resp.json === "function" ? await resp.json() : await resp.json;
      }
      /**
       * Handles the request, including retries for specific errors.
       * @param {object} req - The request object.
       * @param {number} retries - The current retry count.
       * @returns {Promise<object|null>} The response JSON or null if an error occurs.
       */
      async request(req, retries = 0) {
        try {
          req.throw = false;
          const resp = this.request_adapter ? await this.request_adapter({ url: this.endpoint, ...req }) : await fetch(this.endpoint, req);
          const resp_json = await this.get_resp_json(resp);
          if (this.is_error(resp_json))
            return await this.handle_request_err(resp_json, req, retries);
          return resp_json;
        } catch (error) {
          return await this.handle_request_err(error, req, retries);
        }
      }
      /**
       * Handles errors during the request, including retrying the request.
       * @param {Error} error - The error encountered.
       * @param {object} req - The request object.
       * @param {number} retries - The current retry count.
       * @returns {Promise<object|null>} The response JSON or null if an error persists.
       */
      async handle_request_err(error, req, retries) {
        if (error.status === 429 && retries < 3) {
          const backoff = Math.pow(retries + 1, 2);
          console.log(`Retrying request (429) in ${backoff} seconds...`);
          await new Promise((r) => setTimeout(r, 1e3 * backoff));
          return await this.request(req, retries + 1);
        }
        console.error(error);
        return null;
      }
    };
    exports2.ApiAdapter = ApiAdapter;
  }
});

// node_modules/smart-embed-model/adapters/local_api.js
var require_local_api = __commonJS({
  "node_modules/smart-embed-model/adapters/local_api.js"(exports2) {
    var { ApiAdapter } = require_api();
    var LocalApiAdapter = class extends ApiAdapter {
      async embed(input) {
        const resp = await this.embed_batch([{
          embed_input: input
        }]);
        return resp == null ? void 0 : resp[0];
      }
      async init() {
        this.endpoint = this.local_endpoint;
      }
      prepare_batch_input(items) {
        return items.map((item) => {
          return {
            embed_input: this.prepare_embed_input(item.embed_input)
          };
        });
      }
      parse_embedding_output(embed_inputs, embedding, i) {
        return embedding;
      }
      prepare_request_body(input) {
        return {
          model_config: this.main.config,
          input
        };
      }
      prepare_request_headers() {
        return {
          "Content-Type": "application/json"
        };
      }
      is_error(resp) {
        return resp == null ? void 0 : resp.error;
      }
      parse_response(resp) {
        return resp;
      }
    };
    exports2.LocalApiAdapter = LocalApiAdapter;
  }
});

// node_modules/smart-embed-model/adapters/transformers.js
var require_transformers = __commonJS({
  "node_modules/smart-embed-model/adapters/transformers.js"(exports2) {
    var { Adapter } = require_adapter();
    var TransformersAdapter = class extends Adapter {
      async init() {
        const { env, pipeline, AutoTokenizer } = await import("@xenova/transformers");
        env.allowLocalModels = false;
        this.model = await pipeline("feature-extraction", this.model_name, { quantized: true, max_length: this.max_tokens });
        this.tokenizer = await AutoTokenizer.from_pretrained(this.model_name);
      }
      async embed_batch(items) {
        items = items.filter((item) => {
          var _a;
          return ((_a = item.embed_input) == null ? void 0 : _a.length) > 0;
        });
        if (!(items == null ? void 0 : items.length))
          return [];
        const tokens = await Promise.all(items.map((item) => this.count_tokens(item.embed_input)));
        const embed_input = await Promise.all(items.map(async (item, i) => {
          if (tokens[i] < this.max_tokens)
            return item.embed_input;
          let token_ct = tokens[i];
          let truncated_input = item.embed_input;
          while (token_ct > this.max_tokens) {
            const pct = this.max_tokens / token_ct;
            const max_chars = Math.floor(truncated_input.length * pct * 0.9);
            truncated_input = truncated_input.substring(0, max_chars) + "...";
            token_ct = await this.count_tokens(truncated_input);
          }
          tokens[i] = token_ct;
          return truncated_input;
        }));
        try {
          const resp2 = await this.model(embed_input, { pooling: "mean", normalize: true });
          return items.map((item, i) => {
            item.vec = Array.from(resp2[i].data);
            item.tokens = tokens[i];
            return item;
          });
        } catch (err) {
          console.log(err);
          console.log("Error embedding batch. Trying one at a time...");
        }
        const resp = await Promise.all(items.map(async (item) => {
          const { vec, tokens: tokens2, error } = await this.embed(item.embed_input);
          if (error) {
            console.log("Error embedding item: ", item.key);
            console.log(error);
            item.error = error;
            return item;
          }
          if (!vec) {
            console.log("Error embedding item: ", item.key);
            console.log("Vec: ", vec);
            console.log("Error: ", error);
            console.log("Tokens: ", tokens2);
            console.log("No vec returned");
            item.error = "No vec returned";
            return item;
          }
          item.vec = vec.map((val) => Math.round(val * 1e8) / 1e8);
          item.tokens = tokens2;
          return item;
        }));
        return resp;
      }
      async embed(input) {
        const output = { embed_input: input };
        if (!input)
          return { ...output, error: "No input text." };
        if (!this.model)
          await this.init();
        try {
          output.tokens = await this.count_tokens(input);
          if (output.tokens < 1)
            return { ...output, error: "Input too short." };
          if (output.tokens < this.max_tokens) {
            const embedding = await this.model(input, { pooling: "mean", normalize: true });
            output.vec = Array.from(embedding.data).map((val) => Math.round(val * 1e8) / 1e8);
          } else {
            const pct = this.max_tokens / output.tokens;
            const max_chars = Math.floor(input.length * pct * 0.95);
            input = input.substring(0, max_chars) + "...";
            output.truncated = true;
            console.log("Input too long. Truncating to ", input.length, " characters.");
            const { vec, tokens } = await this.embed(input);
            output.vec = vec;
            output.tokens = tokens;
          }
          return output;
        } catch (err) {
          console.log(err);
          return { ...output, error: err.message };
        }
      }
      async count_tokens(text) {
        if (!this.tokenizer)
          await this.init();
        const { input_ids } = await this.tokenizer(text);
        return input_ids.data.length;
      }
    };
    exports2.TransformersAdapter = TransformersAdapter;
  }
});

// node_modules/smart-embed-model/web_connector.json
var require_web_connector = __commonJS({
  "node_modules/smart-embed-model/web_connector.json"(exports2, module2) {
    module2.exports = {
      script: 'var __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __commonJS = (cb, mod) => function __require() {\n  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === "object" || typeof from === "function") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(\n  // If the importer is in node compatibility mode or this is not an ESM\n  // file that has been converted to a CommonJS file using a Babel-\n  // compatible transform (i.e. "__esModule" has not been set), then set\n  // "default" to the CommonJS "module.exports" for node compatibility.\n  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,\n  mod\n));\n\n// adapters/adapter.js\nvar require_adapter = __commonJS({\n  "adapters/adapter.js"(exports) {\n    var Adapter = class {\n      /**\n       * Constructs an instance of Adapter.\n       * @param {object} main - The main context object which should contain a configuration object.\n       */\n      constructor(main) {\n        this.main = main;\n        Object.assign(this, main.config);\n      }\n    };\n    exports.Adapter = Adapter;\n  }\n});\n\n// adapters/transformers.js\nvar require_transformers = __commonJS({\n  "adapters/transformers.js"(exports) {\n    var { Adapter } = require_adapter();\n    var TransformersAdapter = class extends Adapter {\n      async init() {\n        const { env, pipeline, AutoTokenizer } = await import("@xenova/transformers");\n        env.allowLocalModels = false;\n        this.model = await pipeline("feature-extraction", this.model_name, { quantized: true, max_length: this.max_tokens });\n        this.tokenizer = await AutoTokenizer.from_pretrained(this.model_name);\n      }\n      async embed_batch(items) {\n        items = items.filter((item) => {\n          var _a;\n          return ((_a = item.embed_input) == null ? void 0 : _a.length) > 0;\n        });\n        if (!(items == null ? void 0 : items.length))\n          return [];\n        const tokens = await Promise.all(items.map((item) => this.count_tokens(item.embed_input)));\n        const embed_input = await Promise.all(items.map(async (item, i) => {\n          if (tokens[i] < this.max_tokens)\n            return item.embed_input;\n          let token_ct = tokens[i];\n          let truncated_input = item.embed_input;\n          while (token_ct > this.max_tokens) {\n            const pct = this.max_tokens / token_ct;\n            const max_chars = Math.floor(truncated_input.length * pct * 0.9);\n            truncated_input = truncated_input.substring(0, max_chars) + "...";\n            token_ct = await this.count_tokens(truncated_input);\n          }\n          tokens[i] = token_ct;\n          return truncated_input;\n        }));\n        try {\n          const resp2 = await this.model(embed_input, { pooling: "mean", normalize: true });\n          return items.map((item, i) => {\n            item.vec = Array.from(resp2[i].data);\n            item.tokens = tokens[i];\n            return item;\n          });\n        } catch (err) {\n          console.log(err);\n          console.log("Error embedding batch. Trying one at a time...");\n        }\n        const resp = await Promise.all(items.map(async (item) => {\n          const { vec, tokens: tokens2, error } = await this.embed(item.embed_input);\n          if (error) {\n            console.log("Error embedding item: ", item.key);\n            console.log(error);\n            item.error = error;\n            return item;\n          }\n          if (!vec) {\n            console.log("Error embedding item: ", item.key);\n            console.log("Vec: ", vec);\n            console.log("Error: ", error);\n            console.log("Tokens: ", tokens2);\n            console.log("No vec returned");\n            item.error = "No vec returned";\n            return item;\n          }\n          item.vec = vec.map((val) => Math.round(val * 1e8) / 1e8);\n          item.tokens = tokens2;\n          return item;\n        }));\n        return resp;\n      }\n      async embed(input) {\n        const output = { embed_input: input };\n        if (!input)\n          return { ...output, error: "No input text." };\n        if (!this.model)\n          await this.init();\n        try {\n          output.tokens = await this.count_tokens(input);\n          if (output.tokens < 1)\n            return { ...output, error: "Input too short." };\n          if (output.tokens < this.max_tokens) {\n            const embedding = await this.model(input, { pooling: "mean", normalize: true });\n            output.vec = Array.from(embedding.data).map((val) => Math.round(val * 1e8) / 1e8);\n          } else {\n            const pct = this.max_tokens / output.tokens;\n            const max_chars = Math.floor(input.length * pct * 0.95);\n            input = input.substring(0, max_chars) + "...";\n            output.truncated = true;\n            console.log("Input too long. Truncating to ", input.length, " characters.");\n            const { vec, tokens } = await this.embed(input);\n            output.vec = vec;\n            output.tokens = tokens;\n          }\n          return output;\n        } catch (err) {\n          console.log(err);\n          return { ...output, error: err.message };\n        }\n      }\n      async count_tokens(text) {\n        if (!this.tokenizer)\n          await this.init();\n        const { input_ids } = await this.tokenizer(text);\n        return input_ids.data.length;\n      }\n    };\n    exports.TransformersAdapter = TransformersAdapter;\n  }\n});\n\n// transformers_iframe.js\nvar require_transformers_iframe = __commonJS({\n  "transformers_iframe.js"(exports) {\n    var { TransformersAdapter } = require_transformers();\n    var TransformersIframeConnector = class _TransformersIframeConnector extends TransformersAdapter {\n      constructor(model_config, window2) {\n        super({ config: model_config });\n        this.model = null;\n        this.running_init = false;\n        this.window = window2;\n        this.embed_ct = 0;\n        this.timestamp = null;\n        this.tokens = 0;\n      }\n      static async create(model_config, window2) {\n        const connector = new _TransformersIframeConnector(model_config, window2);\n        await connector.init();\n        return connector;\n      }\n      async init() {\n        if (this.model)\n          return console.log("Smart Local Model already loaded");\n        if (this.running_init)\n          await new Promise((resolve) => setTimeout(resolve, 3e3));\n        if (!this.model && !this.running_init)\n          this.running_init = true;\n        console.log("Loading Smart Local Model");\n        const { pipeline, env, AutoTokenizer } = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@latest");\n        env.allowLocalModels = false;\n        this.model = await pipeline("feature-extraction", this.model_name, { quantized: true });\n        this.tokenizer = await AutoTokenizer.from_pretrained(this.model_name);\n        this.running_init = false;\n        this.window.tokenizer = this.tokenizer;\n        console.log(await this.embed("test"));\n        this.window.parent.postMessage({ type: "model_loaded", data: true }, "*");\n        this.window.addEventListener("message", this.handle_ipc.bind(this), false);\n      }\n      async handle_ipc(event) {\n        if (event.data.type == "smart_embed")\n          this.embed_handler(event.data);\n        if (event.data.type == "smart_embed_token_ct")\n          this.count_tokens_handler(event.data.embed_input);\n      }\n      async embed_handler(event_data) {\n        const { embed_input, handler_id } = event_data;\n        if (!this.timestamp)\n          this.timestamp = Date.now();\n        if (Array.isArray(embed_input)) {\n          const resp = await this.embed_batch(embed_input);\n          const send_data = {\n            type: "smart_embed_resp",\n            handler_id,\n            data: resp\n          };\n          this.window.postMessage(send_data, "*");\n          this.tokens += resp.reduce((acc, item) => acc + item.tokens, 0);\n          this.embed_ct += resp.length;\n        } else {\n          if (!this.timestamp)\n            this.timestamp = Date.now();\n          const send_data = await this.embed(embed_input);\n          send_data.type = "smart_embed_resp";\n          if (handler_id)\n            send_data.handler_id = handler_id;\n          this.window.postMessage(send_data, "*");\n          this.tokens += send_data.tokens;\n          this.embed_ct++;\n        }\n        if (Date.now() - this.timestamp > 1e4) {\n          console.log(`Embedded: ${this.embed_ct} inputs (${this.tokens} tokens, ${(this.tokens / ((Date.now() - this.timestamp) / 1e3)).toFixed(0)} tokens/sec)`);\n          this.timestamp = null;\n          this.tokens = 0;\n          this.embed_ct = 0;\n        }\n      }\n      async count_tokens_handler(input) {\n        const output = await this.count_tokens(input);\n        const send_data = {\n          type: "smart_embed_token_ct",\n          text: "count:" + input,\n          count: output\n        };\n        this.window.postMessage(send_data, "*");\n      }\n    };\n    exports.TransformersIframeConnector = TransformersIframeConnector;\n  }\n});\n\n// smart_embed_web.js\nwindow.addEventListener("message", init);\nasync function init(event) {\n  if (event.data.type === "init") {\n    window.removeEventListener("message", init);\n    const model_config = event.data.model_config;\n    console.log(model_config);\n    const { TransformersIframeConnector } = await Promise.resolve().then(() => __toESM(require_transformers_iframe()));\n    const model = await TransformersIframeConnector.create(model_config, window);\n    window.model = model;\n  }\n}\n//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRhcHRlcnMvYWRhcHRlci5qcyIsICJhZGFwdGVycy90cmFuc2Zvcm1lcnMuanMiLCAidHJhbnNmb3JtZXJzX2lmcmFtZS5qcyIsICJzbWFydF9lbWJlZF93ZWIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogUmVwcmVzZW50cyBhIGdlbmVyaWMgYWRhcHRlciBjbGFzcyB0aGF0IGluaXRpYWxpemVzIHdpdGggYSBtYWluIGNvbnRleHQgYW5kIGNvcGllcyBpdHMgY29uZmlndXJhdGlvbi5cbiAqL1xuY2xhc3MgQWRhcHRlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIEFkYXB0ZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBtYWluIC0gVGhlIG1haW4gY29udGV4dCBvYmplY3Qgd2hpY2ggc2hvdWxkIGNvbnRhaW4gYSBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1haW4pIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWFpbiBjb250ZXh0IG9iamVjdCBmcm9tIHdoaWNoIGNvbmZpZ3VyYXRpb24gaXMgZGVyaXZlZC5cbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMubWFpbiA9IG1haW47XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBmcm9tIHRoZSBtYWluIG9iamVjdCdzIGNvbmZpZyBwcm9wZXJ0eSB0byB0aGlzIGluc3RhbmNlLlxuICAgICAqL1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgbWFpbi5jb25maWcpOyAvLyBDb3B5IGNvbmZpZyB0byB0aGlzXG4gIH1cbn1cblxuLy8gRXhwb3J0IHRoZSBBZGFwdGVyIGNsYXNzIHRvIGJlIGF2YWlsYWJsZSBmb3Igb3RoZXIgbW9kdWxlcy5cbmV4cG9ydHMuQWRhcHRlciA9IEFkYXB0ZXI7XG4iLCAiY29uc3QgeyBBZGFwdGVyIH0gPSByZXF1aXJlKFwiLi9hZGFwdGVyXCIpO1xuXG5jbGFzcyBUcmFuc2Zvcm1lcnNBZGFwdGVyIGV4dGVuZHMgQWRhcHRlciB7XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgY29uc3QgeyBlbnYsIHBpcGVsaW5lLCBBdXRvVG9rZW5pemVyIH0gPSBhd2FpdCBpbXBvcnQoJ0B4ZW5vdmEvdHJhbnNmb3JtZXJzJyk7XG4gICAgZW52LmFsbG93TG9jYWxNb2RlbHMgPSBmYWxzZTtcbiAgICB0aGlzLm1vZGVsID0gYXdhaXQgcGlwZWxpbmUoJ2ZlYXR1cmUtZXh0cmFjdGlvbicsIHRoaXMubW9kZWxfbmFtZSwgeyBxdWFudGl6ZWQ6IHRydWUsIG1heF9sZW5ndGg6IHRoaXMubWF4X3Rva2VucyB9KTtcbiAgICAvLyB0aGlzLm1vZGVsID0gYXdhaXQgcGlwZWxpbmUoJ2ZlYXR1cmUtZXh0cmFjdGlvbicsIHRoaXMubW9kZWxfbmFtZSwgeyBxdWFudGl6ZWQ6IGZhbHNlIH0pO1xuICAgIHRoaXMudG9rZW5pemVyID0gYXdhaXQgQXV0b1Rva2VuaXplci5mcm9tX3ByZXRyYWluZWQodGhpcy5tb2RlbF9uYW1lKTtcbiAgfVxuICBhc3luYyBlbWJlZF9iYXRjaChpdGVtcykge1xuICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5lbWJlZF9pbnB1dD8ubGVuZ3RoID4gMCk7IC8vIHJlbW92ZSBpdGVtcyB3aXRoIGVtcHR5IGVtYmVkX2lucHV0IChjYXVzZXMgLnNwbGl0KCkgZXJyb3IpXG4gICAgaWYoIWl0ZW1zPy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCBQcm9taXNlLmFsbChpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmNvdW50X3Rva2VucyhpdGVtLmVtYmVkX2lucHV0KSkpO1xuICAgIGNvbnN0IGVtYmVkX2lucHV0ID0gYXdhaXQgUHJvbWlzZS5hbGwoaXRlbXMubWFwKGFzeW5jIChpdGVtLCBpKSA9PiB7XG4gICAgICBpZiAodG9rZW5zW2ldIDwgdGhpcy5tYXhfdG9rZW5zKSByZXR1cm4gaXRlbS5lbWJlZF9pbnB1dDtcbiAgICAgIGxldCB0b2tlbl9jdCA9IHRva2Vuc1tpXTtcbiAgICAgIGxldCB0cnVuY2F0ZWRfaW5wdXQgPSBpdGVtLmVtYmVkX2lucHV0O1xuICAgICAgd2hpbGUgKHRva2VuX2N0ID4gdGhpcy5tYXhfdG9rZW5zKSB7XG4gICAgICAgIGNvbnN0IHBjdCA9IHRoaXMubWF4X3Rva2VucyAvIHRva2VuX2N0OyAvLyBnZXQgcGN0IG9mIGlucHV0IHRvIGtlZXBcbiAgICAgICAgY29uc3QgbWF4X2NoYXJzID0gTWF0aC5mbG9vcih0cnVuY2F0ZWRfaW5wdXQubGVuZ3RoICogcGN0ICogMC45MCk7IC8vIGdldCBudW1iZXIgb2YgY2hhcmFjdGVycyB0byBrZWVwIChtaW51cyAxMCUgZm9yIHNhZmV0eSlcbiAgICAgICAgdHJ1bmNhdGVkX2lucHV0ID0gdHJ1bmNhdGVkX2lucHV0LnN1YnN0cmluZygwLCBtYXhfY2hhcnMpICsgXCIuLi5cIjtcbiAgICAgICAgdG9rZW5fY3QgPSBhd2FpdCB0aGlzLmNvdW50X3Rva2Vucyh0cnVuY2F0ZWRfaW5wdXQpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coXCJJbnB1dCB0b28gbG9uZy4gVHJ1bmNhdGluZyB0byBcIiwgdHJ1bmNhdGVkX2lucHV0Lmxlbmd0aCwgXCIgY2hhcmFjdGVycy5cIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlRva2VuczogXCIsIHRva2Vuc1tpXSwgXCIgLT4gXCIsIHRva2VuX2N0KTtcbiAgICAgIHRva2Vuc1tpXSA9IHRva2VuX2N0O1xuICAgICAgcmV0dXJuIHRydW5jYXRlZF9pbnB1dDtcbiAgICB9KSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhlbWJlZF9pbnB1dCk7XG4gICAgdHJ5e1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMubW9kZWwoZW1iZWRfaW5wdXQsIHsgcG9vbGluZzogJ21lYW4nLCBub3JtYWxpemU6IHRydWUgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaXRlbS52ZWMgPSBBcnJheS5mcm9tKHJlc3BbaV0uZGF0YSk7XG4gICAgICAgIGl0ZW0udG9rZW5zID0gdG9rZW5zW2ldO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0pO1xuICAgIH1jYXRjaChlcnIpe1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW1iZWRkaW5nIGJhdGNoLiBUcnlpbmcgb25lIGF0IGEgdGltZS4uLlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IFByb21pc2UuYWxsKGl0ZW1zLm1hcChhc3luYyBpdGVtID0+IHtcbiAgICAgIGNvbnN0IHsgdmVjLCB0b2tlbnMsIGVycm9yIH0gPSBhd2FpdCB0aGlzLmVtYmVkKGl0ZW0uZW1iZWRfaW5wdXQpO1xuICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVtYmVkZGluZyBpdGVtOiBcIiwgaXRlbS5rZXkpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIGl0ZW0uZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICBpZighdmVjKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbWJlZGRpbmcgaXRlbTogXCIsIGl0ZW0ua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJWZWM6IFwiLCB2ZWMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuczogXCIsIHRva2Vucyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gdmVjIHJldHVybmVkXCIpO1xuICAgICAgICBpdGVtLmVycm9yID0gXCJObyB2ZWMgcmV0dXJuZWRcIjtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICBpdGVtLnZlYyA9IHZlYy5tYXAodmFsID0+IE1hdGgucm91bmQodmFsICogMTAwMDAwMDAwKSAvIDEwMDAwMDAwMCk7IC8vIHJlZHVjZSBwcmVjaXNpb24gdG8gOCBkZWNpbWFsIHBsYWNlcyByZWY6IGh0dHBzOi8vd2ZoYnJpYW4uY29tL3ZlY3Rvci1kaW1lbnNpb24tcHJlY2lzaW9uLWVmZmVjdC1vbi1jb3NpbmUtc2ltaWxhcml0eS9cbiAgICAgIGl0ZW0udG9rZW5zID0gdG9rZW5zO1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSkpO1xuICAgIHJldHVybiByZXNwO1xuICB9XG4gIGFzeW5jIGVtYmVkKGlucHV0KSB7XG4gICAgY29uc3Qgb3V0cHV0ID0geyBlbWJlZF9pbnB1dDogaW5wdXQgfTtcbiAgICBpZiAoIWlucHV0KSByZXR1cm4geyAuLi5vdXRwdXQsIGVycm9yOiBcIk5vIGlucHV0IHRleHQuXCIgfTtcbiAgICBpZiAoIXRoaXMubW9kZWwpIGF3YWl0IHRoaXMuaW5pdCgpO1xuICAgIHRyeSB7XG4gICAgICBvdXRwdXQudG9rZW5zID0gYXdhaXQgdGhpcy5jb3VudF90b2tlbnMoaW5wdXQpO1xuICAgICAgaWYgKG91dHB1dC50b2tlbnMgPCAxKSByZXR1cm4geyAuLi5vdXRwdXQsIGVycm9yOiBcIklucHV0IHRvbyBzaG9ydC5cIiB9O1xuICAgICAgaWYgKG91dHB1dC50b2tlbnMgPCB0aGlzLm1heF90b2tlbnMpIHtcbiAgICAgICAgY29uc3QgZW1iZWRkaW5nID0gYXdhaXQgdGhpcy5tb2RlbChpbnB1dCwgeyBwb29saW5nOiAnbWVhbicsIG5vcm1hbGl6ZTogdHJ1ZSB9KTtcbiAgICAgICAgb3V0cHV0LnZlYyA9IEFycmF5LmZyb20oZW1iZWRkaW5nLmRhdGEpLm1hcCh2YWwgPT4gTWF0aC5yb3VuZCh2YWwgKiAxMDAwMDAwMDApIC8gMTAwMDAwMDAwKTsgLy8gcmVkdWNlIHByZWNpc2lvbiB0byA4IGRlY2ltYWwgcGxhY2VzIHJlZjogaHR0cHM6Ly93Zmhicmlhbi5jb20vdmVjdG9yLWRpbWVuc2lvbi1wcmVjaXNpb24tZWZmZWN0LW9uLWNvc2luZS1zaW1pbGFyaXR5L1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGN0ID0gdGhpcy5tYXhfdG9rZW5zIC8gb3V0cHV0LnRva2VuczsgLy8gZ2V0IHBjdCBvZiBpbnB1dCB0byBrZWVwXG4gICAgICAgIGNvbnN0IG1heF9jaGFycyA9IE1hdGguZmxvb3IoaW5wdXQubGVuZ3RoICogcGN0ICogMC45NSk7IC8vIGdldCBudW1iZXIgb2YgY2hhcmFjdGVycyB0byBrZWVwIChtaW51cyA1JSBmb3Igc2FmZXR5KVxuICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZygwLCBtYXhfY2hhcnMpICsgXCIuLi5cIjtcbiAgICAgICAgb3V0cHV0LnRydW5jYXRlZCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXQgdG9vIGxvbmcuIFRydW5jYXRpbmcgdG8gXCIsIGlucHV0Lmxlbmd0aCwgXCIgY2hhcmFjdGVycy5cIik7XG4gICAgICAgIGNvbnN0IHsgdmVjLCB0b2tlbnMgfSA9IGF3YWl0IHRoaXMuZW1iZWQoaW5wdXQpO1xuICAgICAgICBvdXRwdXQudmVjID0gdmVjO1xuICAgICAgICBvdXRwdXQudG9rZW5zID0gdG9rZW5zO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm4geyAuLi5vdXRwdXQsIGVycm9yOiBlcnIubWVzc2FnZSB9O1xuICAgIH1cbiAgfVxuICBhc3luYyBjb3VudF90b2tlbnModGV4dCkge1xuICAgIGlmICghdGhpcy50b2tlbml6ZXIpIGF3YWl0IHRoaXMuaW5pdCgpO1xuICAgIGNvbnN0IHsgaW5wdXRfaWRzIH0gPSBhd2FpdCB0aGlzLnRva2VuaXplcih0ZXh0KTtcbiAgICByZXR1cm4gaW5wdXRfaWRzLmRhdGEubGVuZ3RoOyAvLyBSZXR1cm4gdGhlIG51bWJlciBvZiB0b2tlbnNcbiAgfVxufVxuXG5leHBvcnRzLlRyYW5zZm9ybWVyc0FkYXB0ZXIgPSBUcmFuc2Zvcm1lcnNBZGFwdGVyOyIsICJjb25zdCB7IFRyYW5zZm9ybWVyc0FkYXB0ZXIgfSA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvdHJhbnNmb3JtZXJzJyk7XG5cbi8vIENPTk5FQ1RPUiBGT1IgT0JTSURJQU5cbmNsYXNzIFRyYW5zZm9ybWVyc0lmcmFtZUNvbm5lY3RvciBleHRlbmRzIFRyYW5zZm9ybWVyc0FkYXB0ZXIge1xuICBjb25zdHJ1Y3Rvcihtb2RlbF9jb25maWcsIHdpbmRvdykge1xuICAgIHN1cGVyKHtjb25maWc6IG1vZGVsX2NvbmZpZ30pOyAvLyBhc3NpZ25zIGNvbmZpZyB0byB0aGlzIGluIEFkYXB0ZXJcbiAgICB0aGlzLm1vZGVsID0gbnVsbDtcbiAgICB0aGlzLnJ1bm5pbmdfaW5pdCA9IGZhbHNlO1xuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xuICAgIC8vIHN0YXRzXG4gICAgdGhpcy5lbWJlZF9jdCA9IDA7XG4gICAgdGhpcy50aW1lc3RhbXAgPSBudWxsO1xuICAgIHRoaXMudG9rZW5zID0gMDtcbiAgfVxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKG1vZGVsX2NvbmZpZywgd2luZG93KSB7XG4gICAgY29uc3QgY29ubmVjdG9yID0gbmV3IFRyYW5zZm9ybWVyc0lmcmFtZUNvbm5lY3Rvcihtb2RlbF9jb25maWcsIHdpbmRvdyk7XG4gICAgYXdhaXQgY29ubmVjdG9yLmluaXQoKTtcbiAgICByZXR1cm4gY29ubmVjdG9yO1xuICB9XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHJldHVybiBjb25zb2xlLmxvZyhcIlNtYXJ0IExvY2FsIE1vZGVsIGFscmVhZHkgbG9hZGVkXCIpO1xuICAgIGlmICh0aGlzLnJ1bm5pbmdfaW5pdCkgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMDApKTtcbiAgICBpZiAoIXRoaXMubW9kZWwgJiYgIXRoaXMucnVubmluZ19pbml0KSB0aGlzLnJ1bm5pbmdfaW5pdCA9IHRydWU7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIFNtYXJ0IExvY2FsIE1vZGVsXCIpO1xuICAgIC8vIGNvbnN0IHsgcGlwZWxpbmUsIGVudiwgQXV0b1Rva2VuaXplciB9ID0gYXdhaXQgaW1wb3J0KCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0B4ZW5vdmEvdHJhbnNmb3JtZXJzQDIuMTMuMCcpO1xuICAgIGNvbnN0IHsgcGlwZWxpbmUsIGVudiwgQXV0b1Rva2VuaXplciB9ID0gYXdhaXQgaW1wb3J0KCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0B4ZW5vdmEvdHJhbnNmb3JtZXJzQGxhdGVzdCcpO1xuICAgIGVudi5hbGxvd0xvY2FsTW9kZWxzID0gZmFsc2U7XG4gICAgdGhpcy5tb2RlbCA9IGF3YWl0IHBpcGVsaW5lKCdmZWF0dXJlLWV4dHJhY3Rpb24nLCB0aGlzLm1vZGVsX25hbWUsIHsgcXVhbnRpemVkOiB0cnVlIH0pO1xuICAgIHRoaXMudG9rZW5pemVyID0gYXdhaXQgQXV0b1Rva2VuaXplci5mcm9tX3ByZXRyYWluZWQodGhpcy5tb2RlbF9uYW1lKTtcbiAgICB0aGlzLnJ1bm5pbmdfaW5pdCA9IGZhbHNlO1xuICAgIHRoaXMud2luZG93LnRva2VuaXplciA9IHRoaXMudG9rZW5pemVyO1xuICAgIGNvbnNvbGUubG9nKGF3YWl0IHRoaXMuZW1iZWQoXCJ0ZXN0XCIpKTtcbiAgICB0aGlzLndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcIm1vZGVsX2xvYWRlZFwiLCBkYXRhOiB0cnVlIH0sIFwiKlwiKTsgLy8gcG9zdCBtZXNzYWdlIHRvIHBhcmVudCB0aGF0IG1vZGVsIGlzIGxvYWRlZFxuICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuaGFuZGxlX2lwYy5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH1cbiAgYXN5bmMgaGFuZGxlX2lwYyhldmVudCkge1xuICAgIGlmIChldmVudC5kYXRhLnR5cGUgPT0gXCJzbWFydF9lbWJlZFwiKSB0aGlzLmVtYmVkX2hhbmRsZXIoZXZlbnQuZGF0YSk7XG4gICAgLy8gaWYgKGV2ZW50LmRhdGEudHlwZSA9PSBcInNtYXJ0X2VtYmVkX2JhdGNoXCIpIHRoaXMuZW1iZWRfYmF0Y2hfaGFuZGxlcihldmVudC5kYXRhLmVtYmVkX2lucHV0KTtcbiAgICBpZiAoZXZlbnQuZGF0YS50eXBlID09IFwic21hcnRfZW1iZWRfdG9rZW5fY3RcIikgdGhpcy5jb3VudF90b2tlbnNfaGFuZGxlcihldmVudC5kYXRhLmVtYmVkX2lucHV0KTtcbiAgfVxuICBhc3luYyBlbWJlZF9oYW5kbGVyKGV2ZW50X2RhdGEpIHtcbiAgICBjb25zdCB7IGVtYmVkX2lucHV0LCBoYW5kbGVyX2lkIH0gPSBldmVudF9kYXRhO1xuICAgIC8vIGNvbnNvbGUubG9nKGVtYmVkX2lucHV0KTtcbiAgICBpZighdGhpcy50aW1lc3RhbXApIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZihBcnJheS5pc0FycmF5KGVtYmVkX2lucHV0KSkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZW1iZWRfYmF0Y2goZW1iZWRfaW5wdXQpO1xuICAgICAgY29uc3Qgc2VuZF9kYXRhID0ge1xuICAgICAgICB0eXBlOiBcInNtYXJ0X2VtYmVkX3Jlc3BcIixcbiAgICAgICAgaGFuZGxlcl9pZCxcbiAgICAgICAgZGF0YTogcmVzcCxcbiAgICAgIH07XG4gICAgICB0aGlzLndpbmRvdy5wb3N0TWVzc2FnZShzZW5kX2RhdGEsIFwiKlwiKTtcbiAgICAgIHRoaXMudG9rZW5zICs9IHJlc3AucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0udG9rZW5zLCAwKTtcbiAgICAgIHRoaXMuZW1iZWRfY3QgKz0gcmVzcC5sZW5ndGg7XG4gICAgfWVsc2V7XG4gICAgICBpZiAoIXRoaXMudGltZXN0YW1wKSB0aGlzLnRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBzZW5kX2RhdGEgPSBhd2FpdCB0aGlzLmVtYmVkKGVtYmVkX2lucHV0KTtcbiAgICAgIHNlbmRfZGF0YS50eXBlID0gXCJzbWFydF9lbWJlZF9yZXNwXCI7XG4gICAgICBpZiAoaGFuZGxlcl9pZCkgc2VuZF9kYXRhLmhhbmRsZXJfaWQgPSBoYW5kbGVyX2lkO1xuICAgICAgdGhpcy53aW5kb3cucG9zdE1lc3NhZ2Uoc2VuZF9kYXRhLCBcIipcIik7XG4gICAgICB0aGlzLnRva2VucyArPSBzZW5kX2RhdGEudG9rZW5zO1xuICAgICAgdGhpcy5lbWJlZF9jdCsrO1xuICAgIH1cbiAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMudGltZXN0YW1wID4gMTAwMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFbWJlZGRlZDogJHt0aGlzLmVtYmVkX2N0fSBpbnB1dHMgKCR7dGhpcy50b2tlbnN9IHRva2VucywgJHsodGhpcy50b2tlbnMgLyAoKERhdGUubm93KCkgLSB0aGlzLnRpbWVzdGFtcCkgLyAxMDAwKSkudG9GaXhlZCgwKX0gdG9rZW5zL3NlYylgKTtcbiAgICAgIHRoaXMudGltZXN0YW1wID0gbnVsbDtcbiAgICAgIHRoaXMudG9rZW5zID0gMDtcbiAgICAgIHRoaXMuZW1iZWRfY3QgPSAwO1xuICAgIH1cbiAgfVxuICBhc3luYyBjb3VudF90b2tlbnNfaGFuZGxlcihpbnB1dCkge1xuICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IHRoaXMuY291bnRfdG9rZW5zKGlucHV0KTtcbiAgICBjb25zdCBzZW5kX2RhdGEgPSB7XG4gICAgICB0eXBlOiBcInNtYXJ0X2VtYmVkX3Rva2VuX2N0XCIsXG4gICAgICB0ZXh0OiBcImNvdW50OlwiICsgaW5wdXQsXG4gICAgICBjb3VudDogb3V0cHV0XG4gICAgfTtcbiAgICB0aGlzLndpbmRvdy5wb3N0TWVzc2FnZShzZW5kX2RhdGEsIFwiKlwiKTtcbiAgfVxufVxuZXhwb3J0cy5UcmFuc2Zvcm1lcnNJZnJhbWVDb25uZWN0b3IgPSBUcmFuc2Zvcm1lcnNJZnJhbWVDb25uZWN0b3I7XG5cbiIsICJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGluaXQpOyAvLyBsaXN0ZW4gZm9yIGluaXQgbWVzc2FnZVxuYXN5bmMgZnVuY3Rpb24gaW5pdChldmVudCkge1xuICBpZiAoZXZlbnQuZGF0YS50eXBlID09PSAnaW5pdCcpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGluaXQpOyAvLyByZW1vdmUgdGhpcyBldmVudCBsaXN0ZW5lclxuICAgIGNvbnN0IG1vZGVsX2NvbmZpZyA9IGV2ZW50LmRhdGEubW9kZWxfY29uZmlnO1xuICAgIGNvbnNvbGUubG9nKG1vZGVsX2NvbmZpZyk7XG4gICAgY29uc3QgeyBUcmFuc2Zvcm1lcnNJZnJhbWVDb25uZWN0b3IgfSA9IGF3YWl0IGltcG9ydCgnLi90cmFuc2Zvcm1lcnNfaWZyYW1lLmpzJyk7XG4gICAgY29uc3QgbW9kZWwgPSBhd2FpdCBUcmFuc2Zvcm1lcnNJZnJhbWVDb25uZWN0b3IuY3JlYXRlKG1vZGVsX2NvbmZpZywgd2luZG93KTtcbiAgICB3aW5kb3cubW9kZWwgPSBtb2RlbDtcbiAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFHQSxRQUFNLFVBQU4sTUFBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLWixZQUFZLE1BQU07QUFLaEIsYUFBSyxPQUFPO0FBS1osZUFBTyxPQUFPLE1BQU0sS0FBSyxNQUFNO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBR0EsWUFBUSxVQUFVO0FBQUE7QUFBQTs7O0FDdkJsQjtBQUFBO0FBQUEsUUFBTSxFQUFFLFFBQVEsSUFBSTtBQUVwQixRQUFNLHNCQUFOLGNBQWtDLFFBQVE7QUFBQSxNQUN4QyxNQUFNLE9BQU87QUFDWCxjQUFNLEVBQUUsS0FBSyxVQUFVLGNBQWMsSUFBSSxNQUFNLE9BQU8sc0JBQXNCO0FBQzVFLFlBQUksbUJBQW1CO0FBQ3ZCLGFBQUssUUFBUSxNQUFNLFNBQVMsc0JBQXNCLEtBQUssWUFBWSxFQUFFLFdBQVcsTUFBTSxZQUFZLEtBQUssV0FBVyxDQUFDO0FBRW5ILGFBQUssWUFBWSxNQUFNLGNBQWMsZ0JBQWdCLEtBQUssVUFBVTtBQUFBLE1BQ3RFO0FBQUEsTUFDQSxNQUFNLFlBQVksT0FBTztBQUN2QixnQkFBUSxNQUFNLE9BQU8sVUFBSztBQVg5QjtBQVdpQyw2QkFBSyxnQkFBTCxtQkFBa0IsVUFBUztBQUFBLFNBQUM7QUFDekQsWUFBRyxFQUFDLCtCQUFPO0FBQVEsaUJBQU8sQ0FBQztBQUMzQixjQUFNLFNBQVMsTUFBTSxRQUFRLElBQUksTUFBTSxJQUFJLFVBQVEsS0FBSyxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUM7QUFDdkYsY0FBTSxjQUFjLE1BQU0sUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sTUFBTTtBQUNqRSxjQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUs7QUFBWSxtQkFBTyxLQUFLO0FBQzdDLGNBQUksV0FBVyxPQUFPLENBQUM7QUFDdkIsY0FBSSxrQkFBa0IsS0FBSztBQUMzQixpQkFBTyxXQUFXLEtBQUssWUFBWTtBQUNqQyxrQkFBTSxNQUFNLEtBQUssYUFBYTtBQUM5QixrQkFBTSxZQUFZLEtBQUssTUFBTSxnQkFBZ0IsU0FBUyxNQUFNLEdBQUk7QUFDaEUsOEJBQWtCLGdCQUFnQixVQUFVLEdBQUcsU0FBUyxJQUFJO0FBQzVELHVCQUFXLE1BQU0sS0FBSyxhQUFhLGVBQWU7QUFBQSxVQUNwRDtBQUdBLGlCQUFPLENBQUMsSUFBSTtBQUNaLGlCQUFPO0FBQUEsUUFDVCxDQUFDLENBQUM7QUFHRixZQUFHO0FBQ0QsZ0JBQU1BLFFBQU8sTUFBTSxLQUFLLE1BQU0sYUFBYSxFQUFFLFNBQVMsUUFBUSxXQUFXLEtBQUssQ0FBQztBQUUvRSxpQkFBTyxNQUFNLElBQUksQ0FBQyxNQUFNLE1BQU07QUFDNUIsaUJBQUssTUFBTSxNQUFNLEtBQUtBLE1BQUssQ0FBQyxFQUFFLElBQUk7QUFDbEMsaUJBQUssU0FBUyxPQUFPLENBQUM7QUFDdEIsbUJBQU87QUFBQSxVQUNULENBQUM7QUFBQSxRQUNILFNBQU8sS0FBSTtBQUNULGtCQUFRLElBQUksR0FBRztBQUNmLGtCQUFRLElBQUksZ0RBQWdEO0FBQUEsUUFDOUQ7QUFDQSxjQUFNLE9BQU8sTUFBTSxRQUFRLElBQUksTUFBTSxJQUFJLE9BQU0sU0FBUTtBQUNyRCxnQkFBTSxFQUFFLEtBQUssUUFBQUMsU0FBUSxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXO0FBQ2hFLGNBQUcsT0FBTTtBQUNQLG9CQUFRLElBQUksMEJBQTBCLEtBQUssR0FBRztBQUM5QyxvQkFBUSxJQUFJLEtBQUs7QUFDakIsaUJBQUssUUFBUTtBQUNiLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUcsQ0FBQyxLQUFJO0FBQ04sb0JBQVEsSUFBSSwwQkFBMEIsS0FBSyxHQUFHO0FBQzlDLG9CQUFRLElBQUksU0FBUyxHQUFHO0FBQ3hCLG9CQUFRLElBQUksV0FBVyxLQUFLO0FBQzVCLG9CQUFRLElBQUksWUFBWUEsT0FBTTtBQUM5QixvQkFBUSxJQUFJLGlCQUFpQjtBQUM3QixpQkFBSyxRQUFRO0FBQ2IsbUJBQU87QUFBQSxVQUNUO0FBQ0EsZUFBSyxNQUFNLElBQUksSUFBSSxTQUFPLEtBQUssTUFBTSxNQUFNLEdBQVMsSUFBSSxHQUFTO0FBQ2pFLGVBQUssU0FBU0E7QUFDZCxpQkFBTztBQUFBLFFBQ1QsQ0FBQyxDQUFDO0FBQ0YsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU0sTUFBTSxPQUFPO0FBQ2pCLGNBQU0sU0FBUyxFQUFFLGFBQWEsTUFBTTtBQUNwQyxZQUFJLENBQUM7QUFBTyxpQkFBTyxFQUFFLEdBQUcsUUFBUSxPQUFPLGlCQUFpQjtBQUN4RCxZQUFJLENBQUMsS0FBSztBQUFPLGdCQUFNLEtBQUssS0FBSztBQUNqQyxZQUFJO0FBQ0YsaUJBQU8sU0FBUyxNQUFNLEtBQUssYUFBYSxLQUFLO0FBQzdDLGNBQUksT0FBTyxTQUFTO0FBQUcsbUJBQU8sRUFBRSxHQUFHLFFBQVEsT0FBTyxtQkFBbUI7QUFDckUsY0FBSSxPQUFPLFNBQVMsS0FBSyxZQUFZO0FBQ25DLGtCQUFNLFlBQVksTUFBTSxLQUFLLE1BQU0sT0FBTyxFQUFFLFNBQVMsUUFBUSxXQUFXLEtBQUssQ0FBQztBQUM5RSxtQkFBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLElBQUksRUFBRSxJQUFJLFNBQU8sS0FBSyxNQUFNLE1BQU0sR0FBUyxJQUFJLEdBQVM7QUFBQSxVQUM1RixPQUFPO0FBQ0wsa0JBQU0sTUFBTSxLQUFLLGFBQWEsT0FBTztBQUNyQyxrQkFBTSxZQUFZLEtBQUssTUFBTSxNQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3RELG9CQUFRLE1BQU0sVUFBVSxHQUFHLFNBQVMsSUFBSTtBQUN4QyxtQkFBTyxZQUFZO0FBQ25CLG9CQUFRLElBQUksa0NBQWtDLE1BQU0sUUFBUSxjQUFjO0FBQzFFLGtCQUFNLEVBQUUsS0FBSyxPQUFPLElBQUksTUFBTSxLQUFLLE1BQU0sS0FBSztBQUM5QyxtQkFBTyxNQUFNO0FBQ2IsbUJBQU8sU0FBUztBQUFBLFVBQ2xCO0FBQ0EsaUJBQU87QUFBQSxRQUNULFNBQVMsS0FBSztBQUNaLGtCQUFRLElBQUksR0FBRztBQUNmLGlCQUFPLEVBQUUsR0FBRyxRQUFRLE9BQU8sSUFBSSxRQUFRO0FBQUEsUUFDekM7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNLGFBQWEsTUFBTTtBQUN2QixZQUFJLENBQUMsS0FBSztBQUFXLGdCQUFNLEtBQUssS0FBSztBQUNyQyxjQUFNLEVBQUUsVUFBVSxJQUFJLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFDL0MsZUFBTyxVQUFVLEtBQUs7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxZQUFRLHNCQUFzQjtBQUFBO0FBQUE7OztBQ25HOUI7QUFBQTtBQUFBLFFBQU0sRUFBRSxvQkFBb0IsSUFBSTtBQUdoQyxRQUFNLDhCQUFOLE1BQU0scUNBQW9DLG9CQUFvQjtBQUFBLE1BQzVELFlBQVksY0FBY0MsU0FBUTtBQUNoQyxjQUFNLEVBQUMsUUFBUSxhQUFZLENBQUM7QUFDNUIsYUFBSyxRQUFRO0FBQ2IsYUFBSyxlQUFlO0FBQ3BCLGFBQUssU0FBU0E7QUFFZCxhQUFLLFdBQVc7QUFDaEIsYUFBSyxZQUFZO0FBQ2pCLGFBQUssU0FBUztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxhQUFhLE9BQU8sY0FBY0EsU0FBUTtBQUN4QyxjQUFNLFlBQVksSUFBSSw2QkFBNEIsY0FBY0EsT0FBTTtBQUN0RSxjQUFNLFVBQVUsS0FBSztBQUNyQixlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsTUFBTSxPQUFPO0FBQ1gsWUFBSSxLQUFLO0FBQU8saUJBQU8sUUFBUSxJQUFJLGtDQUFrQztBQUNyRSxZQUFJLEtBQUs7QUFBYyxnQkFBTSxJQUFJLFFBQVEsYUFBVyxXQUFXLFNBQVMsR0FBSSxDQUFDO0FBQzdFLFlBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxLQUFLO0FBQWMsZUFBSyxlQUFlO0FBQzNELGdCQUFRLElBQUksMkJBQTJCO0FBRXZDLGNBQU0sRUFBRSxVQUFVLEtBQUssY0FBYyxJQUFJLE1BQU0sT0FBTywwREFBMEQ7QUFDaEgsWUFBSSxtQkFBbUI7QUFDdkIsYUFBSyxRQUFRLE1BQU0sU0FBUyxzQkFBc0IsS0FBSyxZQUFZLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDdEYsYUFBSyxZQUFZLE1BQU0sY0FBYyxnQkFBZ0IsS0FBSyxVQUFVO0FBQ3BFLGFBQUssZUFBZTtBQUNwQixhQUFLLE9BQU8sWUFBWSxLQUFLO0FBQzdCLGdCQUFRLElBQUksTUFBTSxLQUFLLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLGFBQUssT0FBTyxPQUFPLFlBQVksRUFBRSxNQUFNLGdCQUFnQixNQUFNLEtBQUssR0FBRyxHQUFHO0FBQ3hFLGFBQUssT0FBTyxpQkFBaUIsV0FBVyxLQUFLLFdBQVcsS0FBSyxJQUFJLEdBQUcsS0FBSztBQUFBLE1BQzNFO0FBQUEsTUFDQSxNQUFNLFdBQVcsT0FBTztBQUN0QixZQUFJLE1BQU0sS0FBSyxRQUFRO0FBQWUsZUFBSyxjQUFjLE1BQU0sSUFBSTtBQUVuRSxZQUFJLE1BQU0sS0FBSyxRQUFRO0FBQXdCLGVBQUsscUJBQXFCLE1BQU0sS0FBSyxXQUFXO0FBQUEsTUFDakc7QUFBQSxNQUNBLE1BQU0sY0FBYyxZQUFZO0FBQzlCLGNBQU0sRUFBRSxhQUFhLFdBQVcsSUFBSTtBQUVwQyxZQUFHLENBQUMsS0FBSztBQUFXLGVBQUssWUFBWSxLQUFLLElBQUk7QUFDOUMsWUFBRyxNQUFNLFFBQVEsV0FBVyxHQUFHO0FBQzdCLGdCQUFNLE9BQU8sTUFBTSxLQUFLLFlBQVksV0FBVztBQUMvQyxnQkFBTSxZQUFZO0FBQUEsWUFDaEIsTUFBTTtBQUFBLFlBQ047QUFBQSxZQUNBLE1BQU07QUFBQSxVQUNSO0FBQ0EsZUFBSyxPQUFPLFlBQVksV0FBVyxHQUFHO0FBQ3RDLGVBQUssVUFBVSxLQUFLLE9BQU8sQ0FBQyxLQUFLLFNBQVMsTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUM5RCxlQUFLLFlBQVksS0FBSztBQUFBLFFBQ3hCLE9BQUs7QUFDSCxjQUFJLENBQUMsS0FBSztBQUFXLGlCQUFLLFlBQVksS0FBSyxJQUFJO0FBQy9DLGdCQUFNLFlBQVksTUFBTSxLQUFLLE1BQU0sV0FBVztBQUM5QyxvQkFBVSxPQUFPO0FBQ2pCLGNBQUk7QUFBWSxzQkFBVSxhQUFhO0FBQ3ZDLGVBQUssT0FBTyxZQUFZLFdBQVcsR0FBRztBQUN0QyxlQUFLLFVBQVUsVUFBVTtBQUN6QixlQUFLO0FBQUEsUUFDUDtBQUNBLFlBQUksS0FBSyxJQUFJLElBQUksS0FBSyxZQUFZLEtBQU87QUFDdkMsa0JBQVEsSUFBSSxhQUFhLEtBQUssUUFBUSxZQUFZLEtBQUssTUFBTSxhQUFhLEtBQUssV0FBVyxLQUFLLElBQUksSUFBSSxLQUFLLGFBQWEsTUFBTyxRQUFRLENBQUMsQ0FBQyxjQUFjO0FBQ3hKLGVBQUssWUFBWTtBQUNqQixlQUFLLFNBQVM7QUFDZCxlQUFLLFdBQVc7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU0scUJBQXFCLE9BQU87QUFDaEMsY0FBTSxTQUFTLE1BQU0sS0FBSyxhQUFhLEtBQUs7QUFDNUMsY0FBTSxZQUFZO0FBQUEsVUFDaEIsTUFBTTtBQUFBLFVBQ04sTUFBTSxXQUFXO0FBQUEsVUFDakIsT0FBTztBQUFBLFFBQ1Q7QUFDQSxhQUFLLE9BQU8sWUFBWSxXQUFXLEdBQUc7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFDQSxZQUFRLDhCQUE4QjtBQUFBO0FBQUE7OztBQ2hGdEMsT0FBTyxpQkFBaUIsV0FBVyxJQUFJO0FBQ3ZDLGVBQWUsS0FBSyxPQUFPO0FBQ3pCLE1BQUksTUFBTSxLQUFLLFNBQVMsUUFBUTtBQUM5QixXQUFPLG9CQUFvQixXQUFXLElBQUk7QUFDMUMsVUFBTSxlQUFlLE1BQU0sS0FBSztBQUNoQyxZQUFRLElBQUksWUFBWTtBQUN4QixVQUFNLEVBQUUsNEJBQTRCLElBQUksTUFBTTtBQUM5QyxVQUFNLFFBQVEsTUFBTSw0QkFBNEIsT0FBTyxjQUFjLE1BQU07QUFDM0UsV0FBTyxRQUFRO0FBQUEsRUFDakI7QUFDRjsiLAogICJuYW1lcyI6IFsicmVzcCIsICJ0b2tlbnMiLCAid2luZG93Il0KfQo=\n'
    };
  }
});

// node_modules/smart-embed-model/adapters/iframe.js
var require_iframe = __commonJS({
  "node_modules/smart-embed-model/adapters/iframe.js"(exports2) {
    var { Adapter } = require_adapter();
    var web_connector = require_web_connector();
    var IframeAdapter = class extends Adapter {
      constructor(main) {
        super(main);
        this.frame = null;
        this.output = {};
        this.response_handlers = {};
        this.web_script = web_connector.script;
      }
      unload() {
        console.log("SmartEmbedTransformersWebAdapter Unloading");
        this.remove_frame();
        this.frame = null;
        this.output = {};
        this.response_handlers = {};
      }
      async init() {
        if (!this.frame) {
          this.frame = document.createElement("iframe");
          this.frame.style.display = "none";
          this.frame.style.width = "0";
          this.frame.style.height = "0";
          this.frame_loaded = new Promise((resolve) => this.frame.onload = resolve);
          const model_loaded = new Promise((resolve) => {
            window.addEventListener("message", (event) => {
              if (event.data.type === "model_loaded") {
                console.log("Model Loaded: " + this.model_name);
                resolve();
              }
            }, { once: true, capture: false });
          });
          this.frame.srcdoc = this.iframe_script;
          this.container.appendChild(this.frame);
          await this.frame_loaded;
          this.frame.contentWindow.postMessage({ type: "init", model_config: { ...this.main.config, container: null } }, "*");
          await model_loaded;
          this.frame.contentWindow.addEventListener("message", this.handle_iframe_messages.bind(this), false);
        }
        console.log("SmartEmbedTransformersWebAdapter Connected");
      }
      request_embedding(embed_input, retries = 0) {
        if (!(embed_input == null ? void 0 : embed_input.length))
          return console.log("embed_input is empty");
        const handler_id = typeof embed_input === "string" ? embed_input : create_uid(embed_input);
        this.frame.contentWindow.postMessage({ type: "smart_embed", embed_input, handler_id }, "*");
        return new Promise((resolve, reject) => {
          this.response_handlers[handler_id] = ({ error, data }) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve(data);
            }
          };
          setTimeout(() => {
            if (this.response_handlers[handler_id]) {
              reject(new Error("Timeout waiting for response"));
              delete this.response_handlers[handler_id];
            }
          }, 6e4);
        });
      }
      async embed_batch(items) {
        items = items.filter((item) => {
          var _a;
          return ((_a = item.embed_input) == null ? void 0 : _a.length) > 0;
        });
        if (!(items == null ? void 0 : items.length))
          return [];
        const resp = await this.request_embedding(items.map((item) => ({ embed_input: item.embed_input })));
        return items.map((item, i) => {
          const resp_item = resp.data[i];
          item.vec = resp_item.vec;
          item.tokens = resp_item.tokens;
          return item;
        });
      }
      embed(input) {
        return this.request_embedding(input);
      }
      count_tokens(input, timeout = 6e4) {
        this.frame.contentWindow.postMessage({ type: "smart_embed_token_ct", embed_input: input }, "*");
        return new Promise((resolve, reject) => {
          this.response_handlers["count:" + input] = ({ error, data }) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve(data);
            }
          };
          setTimeout(() => {
            if (this.response_handlers["count:" + input]) {
              reject(new Error("Timeout waiting for response"));
              delete this.response_handlers["count:" + input];
            }
          }, timeout);
        });
      }
      get iframe_script() {
        return `<script type="module">${this.web_script}</script>`;
      }
      get is_embedding() {
        return Object.keys(this.response_handlers).length > 0;
      }
      get queue_length() {
        return Object.keys(this.response_handlers).length;
      }
      get container_id() {
        return this.model_name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      }
      remove_frame() {
        if (this.frame)
          this.frame.remove();
        const frame_check = this.container.querySelector("#" + this.container_id);
        if (frame_check)
          frame_check.remove();
        console.log("SmartEmbedTransformersWebAdapter Disconnected");
      }
      handle_iframe_messages(event) {
        if (event.data.type === "smart_embed_resp" || event.data.type === "smart_embed_token_ct") {
          const handler = this.response_handlers[event.data.handler_id || event.data.text];
          if (handler) {
            handler({ error: null, data: event.data });
            delete this.response_handlers[event.data.handler_id || event.data.text];
          }
        }
      }
    };
    exports2.IframeAdapter = IframeAdapter;
    function create_uid(data) {
      const str = JSON.stringify(data);
      let hash = 0;
      if (str.length === 0)
        return hash;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
        if (hash < 0)
          hash = hash * -1;
      }
      return hash.toString() + str.length;
    }
  }
});

// node_modules/smart-embed-model/adapters.js
var require_adapters = __commonJS({
  "node_modules/smart-embed-model/adapters.js"(exports2) {
    var { ApiAdapter } = require_api();
    exports2.api = ApiAdapter;
    var { LocalApiAdapter } = require_local_api();
    exports2.local_api = LocalApiAdapter;
    var { TransformersAdapter } = require_transformers();
    exports2.transformers = TransformersAdapter;
    var { IframeAdapter } = require_iframe();
    exports2.iframe = IframeAdapter;
  }
});

// node_modules/smart-embed-model/models.json
var require_models = __commonJS({
  "node_modules/smart-embed-model/models.json"(exports2, module2) {
    module2.exports = {
      "TaylorAI/bge-micro-v2": {
        model_name: "TaylorAI/bge-micro-v2",
        batch_size: 1,
        dims: 384,
        max_tokens: 512,
        name: "BGE-micro-v2",
        description: "Local, 512 tokens, 384 dim",
        type: "huggingface-transformers"
      },
      "andersonbcdefg/bge-small-4096": {
        model_name: "andersonbcdefg/bge-small-4096",
        batch_size: 1,
        dims: 384,
        max_tokens: 4096,
        name: "BGE-small-4K",
        description: "Local, 4,096 tokens, 384 dim",
        type: "huggingface-transformers"
      },
      "Xenova/jina-embeddings-v2-base-zh-8192": {
        model_name: "Xenova/jina-embeddings-v2-base-zh",
        batch_size: 1,
        dims: 512,
        max_tokens: 8192,
        name: "Jina-v2-base-zh-8K",
        description: "Local, 8,192 tokens, 512 dim, Chinese/English bilingual",
        type: "huggingface-transformers"
      },
      "text-embedding-3-small": {
        model_name: "text-embedding-3-small",
        batch_size: 50,
        dims: 1536,
        max_tokens: 8191,
        name: "OpenAI Text-3 Small",
        description: "API, 8,191 tokens, 1,536 dim",
        endpoint: "https://api.openai.com/v1/embeddings",
        type: "openai"
      },
      "text-embedding-3-large": {
        model_name: "text-embedding-3-large",
        batch_size: 50,
        dims: 3072,
        max_tokens: 8191,
        name: "OpenAI Text-3 Large",
        description: "API, 8,191 tokens, 3,072 dim",
        endpoint: "https://api.openai.com/v1/embeddings",
        type: "openai"
      },
      "text-embedding-3-small-512": {
        model_name: "text-embedding-3-small",
        batch_size: 50,
        dims: 512,
        max_tokens: 8191,
        name: "OpenAI Text-3 Small - 512",
        description: "API, 8,191 tokens, 512 dim",
        endpoint: "https://api.openai.com/v1/embeddings",
        type: "openai"
      },
      "text-embedding-3-large-256": {
        model_name: "text-embedding-3-large",
        batch_size: 50,
        dims: 256,
        max_tokens: 8191,
        name: "OpenAI Text-3 Large - 256",
        description: "API, 8,191 tokens, 256 dim",
        endpoint: "https://api.openai.com/v1/embeddings",
        type: "openai"
      },
      "text-embedding-ada-002": {
        model_name: "text-embedding-ada-002",
        batch_size: 50,
        dims: 1536,
        max_tokens: 8191,
        name: "OpenAI Ada",
        description: "API, 8,191 tokens, 1,536 dim",
        endpoint: "https://api.openai.com/v1/embeddings",
        type: "openai"
      },
      "Xenova/jina-embeddings-v2-small-en": {
        model_name: "Xenova/jina-embeddings-v2-small-en",
        batch_size: 1,
        dims: 512,
        max_tokens: 8192,
        name: "Jina-v2-small-en",
        description: "Local, 8,192 tokens, 512 dim",
        type: "huggingface-transformers"
      },
      "nomic-ai/nomic-embed-text-v1.5-256": {
        model_name: "nomic-ai/nomic-embed-text-v1.5",
        batch_size: 1,
        dims: 256,
        max_tokens: 8192,
        name: "Nomic-embed-text-v1.5",
        description: "Local, 8,192 tokens, 256 dim",
        type: "huggingface-transformers"
      },
      "Xenova/bge-small-en-v1.5": {
        model_name: "Xenova/bge-small-en-v1.5",
        batch_size: 1,
        dims: 384,
        max_tokens: 512,
        name: "BGE-small",
        description: "Local, 512 tokens, 384 dim",
        type: "huggingface-transformers"
      },
      "nomic-ai/nomic-embed-text-v1": {
        model_name: "nomic-ai/nomic-embed-text-v1",
        batch_size: 1,
        dims: 768,
        max_tokens: 2048,
        name: "Nomic-embed-text",
        description: "Local, 2,048 tokens, 768 dim",
        type: "huggingface-transformers"
      }
    };
  }
});

// node_modules/smart-embed-model/smart_embed_model.js
var require_smart_embed_model = __commonJS({
  "node_modules/smart-embed-model/smart_embed_model.js"(exports2) {
    var adapters = require_adapters();
    var embed_models2 = require_models();
    var SmartEmbedModel = class {
      /**
       * Create a SmartEmbed instance.
       * @param {string} env - The environment to use.
       * @param {string|object} config - The model configuration key or the model configuration object.
       * expects model to contain at least a model_key
       */
      constructor(env, config) {
        this.env = env;
        if (config.model_key)
          this.config = { ...embed_models2[config.model_key], ...config };
        else
          this.config = { ...config };
        this.embed_ct = 0;
        this.timestamp = null;
        this.tokens = 0;
        if (this.config.adapter)
          this.adapter = new adapters[this.config.adapter](this);
        else
          this.adapter = new adapters["api"](this);
      }
      /**
       * Factory method to create a new SmartEmbed instance and initialize it.
       * @param {string} env - The environment to use.
       * @param {string} model_config - Full model configuration object or at least a model_key, api_key, and adapter
       * @returns {Promise<SmartEmbed>} A promise that resolves with an initialized SmartEmbed instance.
       */
      static async create(env, model_config) {
        const model = new this(env, model_config);
        if (model.adapter && typeof model.adapter.init === "function")
          await model.adapter.init();
        return model;
      }
      /**
       * Count the number of tokens in the input string.
       * @param {string} input - The input string to process.
       * @returns {Promise<number>} A promise that resolves with the number of tokens.
       */
      async count_tokens(input) {
        if (this.adapter && typeof this.adapter.count_tokens === "function") {
          return await this.adapter.count_tokens(input);
        }
      }
      /**
       * Embed the input string into a numerical array.
       * @param {string} input - The input string to embed.
       * @returns {Promise<number[]>} A promise that resolves with the embedding array.
       */
      async embed(input) {
        if (this.adapter && typeof this.adapter.embed === "function") {
          return await this.adapter.embed(input);
        }
      }
      /**
       * Embed a batch of input strings into arrays of numerical arrays.
       * @param {string[]} input - The array of strings to embed.
       * @returns {Promise<number[][]>} A promise that resolves with the array of embedding arrays.
       */
      async embed_batch(input) {
        if (this.adapter && typeof this.adapter.embed_batch === "function") {
          return await this.adapter.embed_batch(input);
        }
      }
      /**
       * Get the configured batch size for embedding.
       * @returns {number} The batch size.
       */
      get batch_size() {
        return this.config.batch_size;
      }
      /**
       * Get the dimensions of the embedding.
       * @returns {number} The dimensions of the embedding.
       */
      get dims() {
        return this.config.dims;
      }
      /**
       * Get the maximum number of tokens that can be processed.
       * @returns {number} The maximum number of tokens.
       */
      get max_tokens() {
        return this.config.max_tokens;
      }
      /**
       * Get the name of the model used for embedding.
       * @returns {string} The model name.
       */
      get model_name() {
        return this.config.model_name;
      }
    };
    exports2.SmartEmbedModel = SmartEmbedModel;
  }
});

// node_modules/smart-entities/smart_entities.js
var require_smart_entities = __commonJS({
  "node_modules/smart-entities/smart_entities.js"(exports2) {
    var { Collection } = require_Collection();
    var { CollectionItem } = require_CollectionItem();
    var { SmartEmbedModel } = require_smart_embed_model();
    var SmartEntities = class extends Collection {
      constructor(env) {
        super(env);
        this.env = env;
        this._pause_embeddings = false;
      }
      async _save() {
        await this.LTM._save();
      }
      // async b/c Obsidian API is async
      replacer(key, value) {
        if (value instanceof this.item_type) {
          if (!value.validate_save()) {
            console.log("Invalid block, skipping save: ", value.data);
            return void 0;
          }
          if (value.data.embedding.vec && value.data.text)
            value.data.text = void 0;
          return value.data;
        }
        return super.replacer(key, value);
      }
      unload() {
        var _a;
        if (typeof ((_a = this.smart_embed) == null ? void 0 : _a.unload) === "function") {
          this.smart_embed.unload();
          delete this.smart_embed;
        }
        if (this.smart_embed_container) {
          const iframe = this.smart_embed_container.querySelector("iframe");
          if (!iframe)
            return;
          iframe.srcdoc = "";
          iframe.parentNode.removeChild(iframe);
          this.smart_embed_container.remove();
        }
      }
      async load() {
        await this.LTM.load();
        console.log(this);
        console.log(this.env);
        await this.load_smart_embed();
      }
      async load_smart_embed() {
        var _a, _b;
        if (this.smart_embed_model === "None")
          return;
        if (this.env.smart_embed_active_models[this.smart_embed_model] instanceof SmartEmbedModel) {
          this.smart_embed = this.env.smart_embed_active_models[this.smart_embed_model];
          console.log("SmartEmbed already loaded for " + this.collection_name + ": Model: " + this.smart_embed_model);
        } else {
          const model = { model_key: this.smart_embed_model };
          if (this.smart_embed_model.includes("/")) {
            console.log(this.env.local_model_type);
            this.model_key = this.smart_embed_model;
            const local_max = this.env.config.local_embedding_max_tokens;
            if (local_max < model.max_tokens)
              model.max_tokens = local_max;
            console.log("Checking for local Smart Connect server...");
            try {
              const request_adapter = ((_a = this.env.main.obsidian) == null ? void 0 : _a.requestUrl) || null;
              const sc_local = !request_adapter ? await fetch("http://localhost:37421/") : await request_adapter({ url: "http://localhost:37421/", method: "GET" });
              if (sc_local.status === 200) {
                console.log("Local Smart Connect server found");
                this.smart_embed = await SmartEmbedModel.create(this.env, { ...model, request_adapter, adapter: "local_api", local_endpoint: "http://localhost:37421/embed_batch" });
                return;
              }
            } catch (err) {
              console.log("Could not connect to local Smart Connect server");
            }
            if (this.env.local_model_type === "Web") {
              this.model_key += "_web";
              if (this.smart_embed)
                console.log(`Existing WebAdapter for ${this.collection_name} model: ${this.smart_embed_model}`);
              else
                this.smart_embed = await SmartEmbedModel.create(this.env, { ...model, adapter: "iframe", container: this.smart_embed_container });
            } else {
              this.model_key += "_node";
              if (this.smart_embed)
                console.log(`Existing NodeAdapter for ${this.collection_name} model: ${this.smart_embed_model}`);
              else
                this.smart_embed = await SmartEmbedModel.create(this.env, { ...model, adapter: "transformers" });
            }
          } else {
            this.model_key += "_api";
            if (this.smart_embed)
              console.log(`Existing ApiAdapter for ${this.collection_name} model: ${this.smart_embed_model}`);
            else
              this.smart_embed = await SmartEmbedModel.create(this.env, { ...model, request_adapter: (_b = this.env.main.obsidian) == null ? void 0 : _b.requestUrl, api_key: this.config.api_key });
          }
        }
      }
      get smart_embed_container() {
        if (!this.model_key)
          return console.log("model_key not set");
        const id = this.model_key.replace(/[^a-zA-Z0-9]/g, "_");
        if (!window.document)
          return console.log("window.document not available");
        if (window.document.querySelector(`#${id}`))
          return window.document.querySelector(`#${id}`);
        const container = window.document.createElement("div");
        container.id = id;
        window.document.body.appendChild(container);
        return container;
      }
      get smart_embed() {
        var _a;
        return (_a = this.env.active_embed_models) == null ? void 0 : _a[this.model_key];
      }
      set smart_embed(val) {
        if (!this.model_key)
          this.model_key = val.model_name + "_" + val.constructor.name;
        if (!this.env.active_embed_models)
          this.env.active_embed_models = {};
        this.env.active_embed_models[this.model_key] = val;
      }
      pause_embedding() {
        this._pause_embeddings = true;
        this.env.main.notices.remove("embedding progress");
      }
      async ensure_embeddings(show_notice = null) {
        var _a, _b;
        console.log("ensure_embeddings");
        if (!this.smart_embed)
          return console.log("SmartEmbed not loaded for " + this.collection_name);
        const unembedded_items = this.unembedded_items;
        if (unembedded_items.length === 0)
          return true;
        console.log("unembedded_items: ", unembedded_items);
        const performance_notice_msg = "(This is a resource intensive operation)";
        if (show_notice !== false && unembedded_items.length > 30) {
          const start_btn = { text: "Start embedding", callback: () => this.ensure_embeddings(false) };
          this.env.main.notices.show("start embedding", [`Are you ready to begin embedding ${unembedded_items.length} ${this.collection_name}?`, performance_notice_msg], { timeout: 0, confirm: start_btn });
          return false;
        }
        if (this.is_embedding)
          return console.log("already embedding");
        this.is_embedding = true;
        const batch_size = this.smart_embed.batch_size;
        this.env.main.notices.remove("start embedding");
        let total_tokens = 0;
        let time_start = Date.now();
        let time_elapsed = 0;
        let tokens_per_sec = 0;
        for (let i = 0; i < unembedded_items.length; i += batch_size) {
          if (this._pause_embeddings) {
            this._pause_embeddings = false;
            const restart_btn = { text: "Restart", callback: () => this.ensure_embeddings() };
            this.env.main.notices.show("restart embedding", [`Embedding ${this.collection_name}...`, `Paused at ${i} / ${unembedded_items.length} ${this.collection_name}`, performance_notice_msg], { timeout: 0, button: restart_btn });
            this.LTM._save(true);
            this.is_embedding = false;
            return;
          }
          if (i % 10 === 0) {
            const pause_btn = { text: "Pause", callback: () => this.pause_embedding(), stay_open: true };
            this.env.main.notices.show("embedding progress", [`Embedding ${this.collection_name}...`, `Progress: ${i} / ${unembedded_items.length} ${this.collection_name}`, `${tokens_per_sec} tokens/sec`, performance_notice_msg], { timeout: 0, button: pause_btn, immutable: true });
          }
          const items = unembedded_items.slice(i, i + batch_size);
          await Promise.all(items.map(async (item) => await item.get_embed_input()));
          const resp = await this.smart_embed.embed_batch(items);
          items.forEach((item) => {
            item._embed_input = null;
            item.changed = true;
          });
          total_tokens += resp.reduce((acc, item) => acc + item.tokens, 0);
          time_elapsed = Date.now() - time_start;
          tokens_per_sec = Math.round(total_tokens / (time_elapsed / 1e3));
          if (i && i % 500 === 0) {
            await this.LTM._save();
          }
        }
        if ((_b = (_a = this.env.main._notice) == null ? void 0 : _a.noticeEl) == null ? void 0 : _b.parentElement)
          this.env.main._notice.hide();
        const embedded_ct = unembedded_items.filter((i) => i.vec).length;
        this.env.main.notices.remove("embedding progress");
        this.env.main.notices.show("done embedding", [`Embedding ${this.collection_name}...`, `Done creating ${embedded_ct} embeddings.`], { timeout: 1e4 });
        if (unembedded_items.length)
          this.LTM._save();
        this.is_embedding = false;
        return true;
      }
      get embedded_items() {
        return this.smart_embed ? Object.values(this.items).filter((i) => i.vec) : Object.values(this.items);
      }
      get unembedded_items() {
        return this.smart_embed ? Object.values(this.items).filter((item) => !item.vec) : [];
      }
      nearest(vec, filter = {}) {
        if (!vec)
          return console.log("no vec");
        const {
          // results_count = 20,
          results_count = 50
        } = filter;
        const nearest = this.filter(filter).reduce((acc, item) => {
          var _a;
          if (!((_a = item.data.embedding) == null ? void 0 : _a.vec))
            return acc;
          item.sim = cos_sim(vec, item.data.embedding.vec);
          top_acc(acc, item, results_count);
          return acc;
        }, { min: 0, items: /* @__PURE__ */ new Set() });
        return Array.from(nearest.items);
      }
      get file_name() {
        return this.collection_name + "-" + this.smart_embed_model.split("/").pop();
      }
      get smart_embed_model() {
        return this.config[this.collection_name + "_embed_model"];
      }
    };
    var SmartEntity = class extends CollectionItem {
      static get defaults() {
        return {
          data: {
            path: null,
            embedding: {}
          }
        };
      }
      get_key() {
        return this.data.path;
      }
      // DO: clarified/improved logic
      save() {
        this.collection.set(this);
        this.env.save();
      }
      get_nearest(filter = {}) {
      }
      async get_as_context(params = {}) {
        return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${await this.get_content()}
---END NOTE${params.i ? " " + params.i : ""}---`;
      }
      async get_content() {
      }
      // override in child class
      async get_embed_input() {
      }
      // override in child class
      // getters
      get ajson() {
        return `${JSON.stringify(this.key)}: ${JSON.stringify(this.data)}`;
      }
      get embed_link() {
        return `![[${this.data.path}]]`;
      }
      get multi_ajson_file_name() {
        return this.path.split("#").shift().replace(/[^a-zA-Z0-9]/g, "_").replace(".md", "");
      }
      get name() {
        return (!this.env.main.settings.show_full_path ? this.path.split("/").pop() : this.path.split("/").join(" > ")).split("#").join(" > ").replace(".md", "");
      }
      get path() {
        return this.data.path;
      }
      get tokens() {
        return this.data.embedding.tokens;
      }
      get vec() {
        return this.data.embedding.vec;
      }
      // setters
      set error(error) {
        this.data.embedding.error = error;
      }
      set tokens(tokens) {
        this.data.embedding.tokens = tokens;
      }
      set vec(vec) {
        this.data.embedding.vec = vec;
      }
    };
    function cos_sim(vector1, vector2) {
      const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
      const normA = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
      const normB = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
      return normA === 0 || normB === 0 ? 0 : dotProduct / (normA * normB);
    }
    function top_acc(_acc, item, ct = 10) {
      if (_acc.items.size < ct) {
        _acc.items.add(item);
      } else if (item.sim > _acc.min) {
        _acc.items.add(item);
        _acc.items.delete(_acc.minItem);
        _acc.minItem = Array.from(_acc.items).reduce((min, curr) => curr.sim < min.sim ? curr : min);
        _acc.min = _acc.minItem.sim;
      }
    }
    exports2.SmartEntity = SmartEntity;
    exports2.SmartEntities = SmartEntities;
    exports2.cos_sim = cos_sim;
    var SmartNotes = class extends SmartEntities {
      async import(files, opts = {}) {
        var _a;
        try {
          let batch = [];
          const timeoutDuration = 1e4;
          for (let i = 0; i < files.length; i++) {
            if (batch.length % 10 === 0) {
              this.env.main.notices.show("initial scan progress", [`Making Smart Connections...`, `Progress: ${i} / ${files.length} files`], { timeout: 0 });
              const batchPromise = Promise.all(batch);
              const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject(new Error("Batch processing timed out"));
                }, timeoutDuration);
              });
              try {
                await Promise.race([batchPromise, timeoutPromise]);
              } catch (error) {
                console.error("Batch processing error:", error);
                const files_in_batch = files.slice(i - batch.length, i);
                console.log(files_in_batch.map((file) => file.path));
              }
              batch = [];
            }
            const note = this.get(files[i].path);
            if (!note)
              batch.push(this.create_or_update({ path: files[i].path }));
            else {
              if (note.meta_changed) {
                note.data.embedding = {};
                batch.push(this.create_or_update({ path: files[i].path }));
              } else if ((_a = this.env.smart_blocks) == null ? void 0 : _a.smart_embed) {
                batch.push(this.env.smart_blocks.import(note, { show_notice: false }));
              }
            }
          }
          if (batch.length > 0) {
            const batchPromise = Promise.all(batch);
            const timeoutPromise = new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error("Final batch processing timed out"));
              }, timeoutDuration);
            });
            try {
              await Promise.race([batchPromise, timeoutPromise]);
            } catch (error) {
              console.error("Final batch processing error:", error);
            }
          }
          this.env.main.notices.remove("initial scan progress");
          this.env.main.notices.show("done initial scan", [`Making Smart Connections...`, `Done importing Smart Notes.`], { timeout: 3e3 });
          this.ensure_embeddings();
        } catch (e) {
          console.log("error importing blocks");
          console.log(e);
        }
      }
      async ensure_embeddings(show_notice = false) {
        var _a;
        await super.ensure_embeddings(show_notice);
        await this.prune(true);
        if ((_a = this.env.smart_blocks) == null ? void 0 : _a.smart_embed) {
          await this.env.smart_blocks.ensure_embeddings({ show_notice });
          await this.env.smart_blocks.prune(true);
        }
      }
      async prune(override = false) {
        var _a;
        const remove = [];
        const items_w_vec = Object.entries(this.items).filter(([key, note]) => note.vec);
        const total_items_w_vec = items_w_vec.length;
        const available_notes = this.env.files.reduce((acc, file) => {
          acc[file.path] = true;
          return acc;
        }, {});
        if (!total_items_w_vec) {
          this.clear();
          return;
        }
        for (const [key, note] of items_w_vec) {
          if (!available_notes[note.data.path]) {
            remove.push(key);
            continue;
          }
          if (note.is_gone) {
            remove.push(key);
            continue;
          }
          if (note.meta_changed) {
            const content = await note.get_content();
            const hash = await create_hash(content);
            if (hash !== ((_a = note.last_history) == null ? void 0 : _a.hash)) {
              remove.push(key);
              continue;
            }
          }
        }
        console.log(remove);
        const remove_ratio = remove.length / total_items_w_vec;
        if (override && remove_ratio < 0.5 || confirm(`Are you sure you want to delete ${remove.length} (${Math.floor(remove_ratio * 100)}%) Note-level Embeddings?`)) {
          this.delete_many(remove);
          this.LTM._save(true);
          console.log(`Pruned ${remove.length} Smart Notes`);
        }
      }
      get current_note() {
        return this.get(this.env.main.app.workspace.getActiveFile().path);
      }
      get blocks() {
        this.env.smart_blocks.get_many(this.last_history.blocks);
      }
    };
    var SmartNote = class extends SmartEntity {
      static get defaults() {
        return {
          data: {
            history: []
            // array of { mtime, hash, length, blocks[] }
          },
          _embed_input: null
          // stored temporarily
        };
      }
      async init() {
        var _a;
        const content = await this.get_content();
        const hash = await create_hash(content);
        if (hash !== ((_a = this.last_history) == null ? void 0 : _a.hash)) {
          this.data.history.push({ blocks: {}, mtime: this.t_file.stat.mtime, size: this.t_file.stat.size, hash });
          this.data.embedding = {};
        } else {
          this.last_history.mtime = this.t_file.stat.mtime;
          this.last_history.size = this.t_file.stat.size;
        }
        this.env.smart_blocks.import(this, { show_notice: false });
      }
      async get_embed_input() {
        if (typeof this._embed_input === "string" && this._embed_input.length)
          return this._embed_input;
        const content = await this.get_content();
        const breadcrumbs = this.data.path.split("/").join(" > ").replace(".md", "");
        this._embed_input = `${breadcrumbs}:
${content}`;
        return this._embed_input;
      }
      find_connections() {
        let results = [];
        if (!this.vec && !this.median_block_vec) {
          const start_embedding_btn = {
            text: "Start embedding",
            callback: () => {
              this.collection.import().then(() => this.env.main.view.render_nearest(this));
            }
          };
          this.env.main.notices.show("no embedding found", `No embeddings found for ${this.name}.`, { confirm: start_embedding_btn });
          return results;
        }
        if (this.vec && this.median_block_vec && this.env.smart_blocks.smart_embed && this.collection.smart_embed) {
          const nearest_blocks = this.env.smart_blocks.nearest(this.median_block_vec, { exclude_key_starts_with: this.key });
          const nearest_notes = this.env.smart_notes.nearest(this.vec, { exclude_key_starts_with: this.key });
          results = nearest_blocks.map((block) => {
            const note = nearest_notes.find((note2) => note2.key === block.note_key);
            if (!note)
              block.score = block.sim;
            else
              block.score = (block.sim + note.sim) / 2;
            return block;
          }).sort((a, b) => {
            if (a.score === b.score)
              return 0;
            return a.score > b.score ? -1 : 1;
          });
        } else if (this.median_block_vec && this.env.smart_blocks.smart_embed) {
          const nearest_blocks = this.env.smart_blocks.nearest(this.median_block_vec, { exclude_key_starts_with: this.key });
          results = nearest_blocks.map((block) => {
            var _a;
            if (!((_a = block.note) == null ? void 0 : _a.median_block_vec.length)) {
              block.score = block.sim;
              return block;
            }
            block.score = (block.sim + cos_sim(this.median_block_vec, block.note.median_block_vec)) / 2;
            return block;
          }).sort((a, b) => {
            if (a.score === b.score)
              return 0;
            return a.score > b.score ? -1 : 1;
          });
        } else if (this.vec && this.collection.smart_embed) {
          const nearest_notes = this.env.smart_notes.nearest(this.vec, { exclude_key_starts_with: this.key });
          results = nearest_notes.map((note) => {
            note.score = note.sim;
            return note;
          }).sort((a, b) => {
            if (a.score === b.score)
              return 0;
            return a.score > b.score ? -1 : 1;
          });
        }
        return results;
      }
      open() {
        this.env.main.open_note(this.data.path);
      }
      get_block_by_line(line) {
        return this.blocks.find((block) => block.data.lines[0] <= line && block.data.lines[1] >= line);
      }
      get block_vecs() {
        return this.blocks.map((block) => block.data.embedding.vec).filter((vec) => vec);
      }
      // filter out blocks without vec
      get blocks() {
        return Object.keys(this.last_history.blocks).map((block_key) => this.env.smart_blocks.get(block_key)).filter((block) => block);
      }
      // filter out blocks that don't exist
      get embed_input() {
        return this._embed_input ? this._embed_input : this.get_embed_input();
      }
      get meta_changed() {
        if (!this.last_history)
          return true;
        return this.last_history.mtime !== this.t_file.stat.mtime && this.last_history.size !== this.t_file.stat.size;
      }
      get is_canvas() {
        return this.data.path.endsWith("canvas");
      }
      get is_excalidraw() {
        return this.data.path.endsWith("excalidraw.md");
      }
      get is_gone() {
        return this.t_file === null;
      }
      get last_history() {
        return this.data.history.length ? this.data.history[this.data.history.length - 1] : null;
      }
      get mean_block_vec() {
        return this._mean_block_vec ? this._mean_block_vec : this._mean_block_vec = this.block_vecs.reduce((acc, vec) => acc.map((val, i) => val + vec[i]), Array(384).fill(0)).map((val) => val / this.block_vecs.length);
      }
      get median_block_vec() {
        var _a;
        return this._median_block_vec ? this._median_block_vec : this._median_block_vec = (_a = this.block_vecs[0]) == null ? void 0 : _a.map((val, i) => this.block_vecs.map((vec) => vec[i]).sort()[Math.floor(this.block_vecs.length / 2)]);
      }
      get note_name() {
        return this.path.split("/").pop().replace(".md", "");
      }
      get t_file() {
        return this.env.get_tfile(this.data.path);
      }
    };
    var SmartBlocks = class extends SmartEntities {
      async import(note) {
        try {
          const note_path = note.data.path;
          const note_content = await note.get_content();
          const { blocks } = this.env.smart_markdown.parse({ content: note_content, file_path: note_path });
          blocks.forEach((block) => {
            const item = this.create_or_update(block);
            note.last_history.blocks[item.key] = true;
          });
        } catch (e) {
          console.log("error parsing blocks for note: ", note.key);
          console.log(e);
        }
      }
      async prune(override = false) {
        const remove = [];
        const total_items_w_vec = this.embedded_items.length;
        if (!total_items_w_vec) {
          return;
        }
        for (const [key, block] of Object.entries(this.items)) {
          if (block.is_gone)
            remove.push(key);
        }
        const remove_ratio = remove.length / total_items_w_vec;
        if (override && remove_ratio < 0.5 || confirm(`Are you sure you want to delete ${remove.length} (${Math.floor(remove_ratio * 100)}%) Block-level embeddings?`)) {
          this.delete_many(remove);
          if (!override)
            this.LTM._save(true);
        }
        console.log(`Pruned ${remove.length} SmartBlocks.`);
      }
    };
    var SmartBlock = class extends SmartEntity {
      static get defaults() {
        return {
          data: {
            text: null,
            // hash: null,
            length: 0
          },
          _embed_input: ""
          // stored temporarily
        };
      }
      // SmartChunk: text, length, path
      update_data(data) {
        var _a, _b;
        if (!this.is_new || ((_a = this.vec) == null ? void 0 : _a.length) !== this.collection.smart_embed.dims) {
          if (this.data.length !== data.length)
            this.data.embedding = {};
        }
        if (!((_b = this.data.embedding) == null ? void 0 : _b.vec))
          this._embed_input += data.text;
        delete data.text;
        super.update_data(data);
        return true;
      }
      init() {
        if (!this.note)
          return console.log({ "no note for block": this.data });
        if (Array.isArray(this.note.last_history.blocks))
          this.note.last_history.blocks = {};
        this.note.last_history.blocks[this.key] = true;
      }
      async get_content() {
        var _a;
        const note_content = await ((_a = this.note) == null ? void 0 : _a.get_content());
        if (!note_content)
          return null;
        const block_content = this.env.smart_markdown.get_block_from_path(this.data.path, note_content);
        return block_content;
      }
      async get_embed_input() {
        if (typeof this._embed_input === "string" && this._embed_input.length)
          return this._embed_input;
        this._embed_input = this.breadcrumbs + "\n" + await this.get_content();
        return this._embed_input;
      }
      async get_next_k_shot(i) {
        if (!this.next_block)
          return null;
        const current = await this.get_content();
        const next = await this.next_block.get_content();
        return `---BEGIN CURRENT ${i}---
${current}
---END CURRENT ${i}---
---BEGIN NEXT ${i}---
${next}
---END NEXT ${i}---
`;
      }
      find_connections() {
        if (!this.vec)
          return [];
        return this.env.smart_blocks.nearest(this.vec, { exclude_key_starts_with: this.note.key });
      }
      get breadcrumbs() {
        return this.data.path.split("/").join(" > ").split("#").join(" > ").replace(".md", "");
      }
      get embed_input() {
        return this._embed_input ? this._embed_input : this.get_embed_input();
      }
      get lines() {
        return { start: this.data.lines[0], end: this.data.lines[1] };
      }
      get folder() {
        return this.data.path.split("/").slice(0, -1).join("/");
      }
      get is_block() {
        this.data.path.includes("#");
      }
      get is_gone() {
        if (this.env.smart_notes.unembedded_items.length)
          return false;
        if (!this.note)
          return true;
        if (this.note.is_gone)
          return true;
        if (!this.note.last_history.blocks[this.key])
          return true;
        return false;
      }
      // use text length to detect changes
      get name() {
        return (!this.env.main.settings.show_full_path ? this.data.path.split("/").pop() : this.data.path.split("/").join(" > ")).split("#").join(" > ").replace(".md", "");
      }
      // uses data.lines to get next block
      get next_block() {
        var _a;
        if (!this.data.lines)
          return null;
        const next_line = this.data.lines[1] + 1;
        return (_a = this.note.blocks) == null ? void 0 : _a.find((block) => {
          var _a2, _b;
          return next_line === ((_b = (_a2 = block.data) == null ? void 0 : _a2.lines) == null ? void 0 : _b[0]);
        });
      }
      get note() {
        return this.env.smart_notes.get(this.note_key);
      }
      get note_key() {
        return this.data.path.split("#")[0];
      }
      get note_name() {
        return this.note_key.split("/").pop().replace(".md", "");
      }
      // backwards compatibility (DEPRECATED)
      get link() {
        return this.data.path;
      }
    };
    async function create_hash(text) {
      if (text.length > 1e5)
        text = text.substring(0, 1e5);
      const msgUint8 = new TextEncoder().encode(text.trim());
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
    exports2.SmartBlock = SmartBlock;
    exports2.SmartBlocks = SmartBlocks;
    exports2.SmartNote = SmartNote;
    exports2.SmartNotes = SmartNotes;
  }
});

// src/render_dataview_codeblocks.js
var require_render_dataview_codeblocks = __commonJS({
  "src/render_dataview_codeblocks.js"(exports2) {
    async function render_dataview_codeblocks(file_content, note_path, opts = {}) {
      opts = {
        char_limit: null,
        ...opts
      };
      const dataview_api = window == null ? void 0 : window["DataviewAPI"];
      if (!dataview_api)
        return file_content;
      if (!file_content)
        return file_content;
      const dataview_code_blocks = file_content.match(/```dataview(.*?)```/gs);
      if (!dataview_code_blocks)
        return file_content;
      for (let i = 0; i < dataview_code_blocks.length; i++) {
        if (opts.char_limit && opts.char_limit < file_content.indexOf(dataview_code_blocks[i]))
          break;
        const dataview_code_block = dataview_code_blocks[i];
        const dataview_code_block_content = dataview_code_block.replace("```dataview", "").replace("```", "");
        const dataview_query_result = await dataview_api.queryMarkdown(dataview_code_block_content, note_path, null);
        if (dataview_query_result.successful) {
          file_content = file_content.replace(dataview_code_block, dataview_query_result.value);
        }
      }
      return file_content;
    }
    exports2.render_dataview_codeblocks = render_dataview_codeblocks;
  }
});

// src/sc_entities.js
var require_sc_entities = __commonJS({
  "src/sc_entities.js"(exports2) {
    var {
      SmartBlock: BaseSmartBlock,
      SmartBlocks,
      SmartNote: BaseSmartNote,
      SmartNotes
    } = require_smart_entities();
    var { render_dataview_codeblocks } = require_render_dataview_codeblocks();
    var SmartNote = class extends BaseSmartNote {
      async get_content() {
        return await this.brain.cached_read(this.data.path);
      }
      async get_as_context(params = {}) {
        const content = await render_dataview_codeblocks(await this.get_content(), this.data.path);
        return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
      }
    };
    var SmartBlock = class extends BaseSmartBlock {
      async get_as_context(params = {}) {
        const content = await render_dataview_codeblocks(await this.get_content(), this.data.path);
        return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
      }
    };
    exports2.SmartNotes = SmartNotes;
    exports2.SmartNote = SmartNote;
    exports2.SmartBlocks = SmartBlocks;
    exports2.SmartBlock = SmartBlock;
  }
});

// src/smart_socket.js
var require_smart_socket = __commonJS({
  "src/smart_socket.js"(exports2) {
    var SmartSocket = class {
      /**
       * Creates an instance of SmartSocket.
       * @param {number} port The port number to connect to.
       */
      constructor(port) {
        this.port = port;
        this.ws_retries = 0;
        this.ws = null;
        this.retry = false;
      }
      /**
       * Initiates the connection process, with optional retry logic.
       * @param {boolean} [retry=false] Whether to attempt a reconnection.
       */
      async connect(retry = false) {
        this.retry = retry;
        if (!this.can_attempt_connection(retry))
          return;
        if (retry)
          await this.calculate_backoff(retry);
        if (typeof this.is_server_running === "function") {
          const is_running = await this.is_server_running();
          if (!is_running) {
            console.log("Smart Connect is not running, will try to connect again later");
            this.connect(true);
            return;
          }
        }
        try {
          await this.initialize_websocket();
        } catch (err) {
          if (retry && (this.ws_retries < 10 || typeof this.is_server_running === "function")) {
            await this.handle_connection_error(true, err);
          } else {
            this.on_fail_to_reconnect();
          }
        }
      }
      /**
       * Checks if a new connection attempt can be made.
       * @param {boolean} retry Indicates if this is a retry attempt.
       * @returns {boolean} True if a connection attempt can be made, false otherwise.
       */
      can_attempt_connection(retry) {
        retry = retry || this.retry;
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          console.log("WebSocket is already connected. Aborting new connection attempt.");
          return false;
        }
        if (retry && this.ws_retries >= 10) {
          console.error("Failed to reconnect after 10 attempts");
          this.on_fail_to_reconnect();
          return false;
        }
        return true;
      }
      /**
       * Calculates and applies a backoff delay for reconnection attempts.
       * @param {boolean} retry Indicates if this is a retry attempt.
       * @returns {Promise<void>} A promise that resolves after the backoff delay.
       */
      calculate_backoff(retry) {
        if (retry || this.retry) {
          this.ws_retries += 1;
          const backoff_time = Math.min(1e3 * Math.pow(2, this.ws_retries), 6e4);
          console.log(`Attempting to reconnect in ${backoff_time / 1e3} seconds...`);
          return new Promise((resolve) => setTimeout(resolve, backoff_time));
        }
        return Promise.resolve();
      }
      /**
       * Initializes the WebSocket connection.
       * @returns {Promise<void>} A promise that resolves when the WebSocket is successfully opened.
       */
      async initialize_websocket() {
        this.cleanup_websocket();
        await new Promise((resolve, reject) => {
          const timeout_id = setTimeout(() => {
            var _a;
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
              (_a = this.ws) == null ? void 0 : _a.close();
              reject(new Error("WebSocket failed to connect"));
            }
          }, 1e4);
          this.ws = new WebSocket(`ws://localhost:${this.port}`);
          this.ws.onopen = () => {
            clearTimeout(timeout_id);
            this.on_open();
            this.ws_retries = 0;
            this.retry = true;
            resolve();
          };
          this.ws.onclose = (event) => {
            this.cleanup_websocket();
            reject(new Error("WebSocket closed"));
            this.on_close();
          };
          this.ws.onerror = (err) => {
            this.cleanup_websocket();
            reject(err);
            this.on_error(err);
          };
          this.ws.onmessage = this.handle_message.bind(this);
        });
      }
      cleanup_websocket() {
        if (this.ws) {
          this.ws.onopen = null;
          this.ws.onclose = null;
          this.ws.onerror = null;
          this.ws.onmessage = null;
          if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
            this.ws.close();
          }
          this.ws = null;
        }
      }
      /**
       * Handles connection errors and decides whether to retry.
       * @param {boolean} retry Indicates if this is a retry attempt.
       * @param {Error} err The error that occurred during connection.
       */
      async handle_connection_error(retry, err) {
        console.log("Handling WebSocket connection error on port " + this.port);
        if (retry && this.ws_retries < 10) {
          await this.connect(true);
        } else if (!retry || this.ws_retries >= 10) {
          console.error("Failed to connect to WebSocket after retries:");
          console.log(err);
          this.on_fail_to_reconnect();
        }
      }
      /**
       * Placeholder for error handling logic.
       * @param {Error} err The error encountered.
       */
      on_error(err) {
      }
      /**
       * Handles WebSocket closure and attempts reconnection.
       */
      on_close() {
        console.log("Disconnected from WebSocket");
        if (this.retry && this.should_attempt_reconnect) {
          this.connect(true);
        } else {
          console.log("Reconnection not attempted due to policy (intentional disconnection or retry limit reached).");
        }
      }
      get should_attempt_reconnect() {
        return this.ws_retries < 10;
      }
      /**
       * Logs successful WebSocket connection.
       */
      on_open() {
        console.log(`Connected to WebSocket on port ${this.port}`);
      }
      /**
       * Handles incoming WebSocket messages.
       * @param {MessageEvent} event The message event.
       */
      handle_message(event) {
        console.log("Message from server", event.data);
      }
      /**
       * Handles failure to reconnect after multiple attempts.
       */
      on_fail_to_reconnect() {
        console.error("Failed to reconnect, will not retry...");
      }
      /**
       * Closes the WebSocket connection.
       */
      unload() {
        this.cleanup_websocket();
      }
    };
    exports2.SmartSocket = SmartSocket;
  }
});

// src/dataview_socket.js
var require_dataview_socket = __commonJS({
  "src/dataview_socket.js"(exports2) {
    var { SmartSocket } = require_smart_socket();
    var DataviewSocket = class extends SmartSocket {
      constructor(env, port) {
        super(port);
        this.env = env;
        this.brain = this.env;
        this.dataview_api = null;
      }
      static async create(env, port) {
        const smart_socket = new DataviewSocket(env, port);
        env.dv_ws = smart_socket;
        await smart_socket.init();
        return smart_socket;
      }
      async init() {
        await this.get_dataview_api();
        await this.connect();
      }
      async is_server_running() {
        var _a;
        try {
          const sc_local = await ((_a = this.env.main.obsidian) == null ? void 0 : _a.requestUrl({ url: "http://localhost:37421/", method: "GET" }));
          console.log(sc_local);
          return (sc_local == null ? void 0 : sc_local.status) === 200;
        } catch (err) {
          return false;
        }
      }
      async get_dataview_api(retries = 0) {
        this.dataview_api = window["DataviewAPI"];
        if (!this.dataview_api) {
          if (retries < 10) {
            await new Promise((resolve) => setTimeout(resolve, retries * 1e3));
            return this.get_dataview_api(retries + 1);
          } else {
            this.brain.main.show_notice("Dataview API not found");
          }
        }
      }
      async handle_message(event) {
        console.log("Message from server ", event.data);
        console.log(typeof event.data);
        const data = JSON.parse(event.data);
        try {
          const resp = await this.dataview_api.queryMarkdown(data.query, data.rel_path, null);
          console.log(resp);
          this.ws.send(JSON.stringify(resp));
        } catch (err) {
          console.error(err);
          this.ws.send(JSON.stringify({ status: "error", message: err }));
        }
      }
    };
    exports2.DataviewSocket = DataviewSocket;
  }
});

// build/views.json
var require_views = __commonJS({
  "build/views.json"(exports2, module2) {
    module2.exports = {
      attribution: '<div class="sc-brand">\n  <svg viewBox="0 0 100 100" class="svg-icon smart-connections">\n    <path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"></path>\n    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"></path>\n    <circle cx="50" cy="20" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="40" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="70" r="9" fill="currentColor"></circle>\n    <circle cx="50" cy="100" r="9" fill="currentColor"></circle>\n    <circle cx="30" cy="50" r="9" fill="currentColor"></circle>\n  </svg>\n  <p><a style="font-weight: 700;" href="https://smartconnections.app/">Smart Connections</a></p>\n</div>',
      sc_change: '<div class="sc-change">\n  <div class="sc-variation">\n    <div class="new-content"></div>\n    <button>Accept</button>\n  </div>\n  <div class="sc-variation">\n    <div class="old-content"></div>\n    <button>Reject</button>\n  </div>\n  <div class="sc-change-footer">\n    <i>Time saved: <%= time_saved %></i>\n    <%- this.attribution %>\n  </div>\n</div>\n\n',
      smart_chat: `<div class="workspace-leaf-content" data-type="smart-connections-chat-view">
  <div class="sc-chat-container">
    <div class="sc-top-bar-container">
      <input class="sc-chat-name-input" type="text" value="<%= name %>" placeholder="Chat Name">
      <button title="Open Conversation Note"><%- this.get_icon('external-link') %></button>
      <button title="Chat History"><%- this.get_icon('history') %></button>
      <button title="Settings"><%- this.get_icon('gear') %></button>
      <button title="New Chat"><%- this.get_icon('plus') %></button>
    </div>
    <div class="sc-chat-box">
      <div class="sc-message-container">
        <div class="sc-message assistant">
          <div class="sc-message-content">
            <span>
              Hi there, welcome to the Smart Chat.&nbsp;Ask me a question about your notes and I'll try to answer it.
            </span>
          </div>
        </div>
        <%- messages %>
      </div>
    </div>
    <div class="sc-chat-form"><textarea class="sc-chat-input"
        placeholder="Try &quot;Based on my notes&quot; or &quot;Summarize [[this note]]&quot; or &quot;Important tasks in /folder/&quot;"></textarea>
      <div class="sc-button-container">
        <span id="sc-abort-button" style="display: none;"><%- this.get_icon('square') %></span>
        <button class="send-button" id="sc-send-button">Send</button>
      </div>
    </div>
    <div id="settings"></div>
  </div>
  <%- this.attribution %>
</div>`,
      smart_chat_msg: `<div class="sc-message <%= role %>">
  <div class="sc-message-content" data-content="<%= content %>">
    <span><%= content %></span>
    <span class="sc-msg-button" title="Copy message to clipboard"><%- this.get_icon('copy') %></span>
    <!-- TODO: Copy context to clipboard (icon: eye) -->
    <!-- TODO: Copy prompt to clipboard (icon: files) -->
  </div>
</div>`,
      smart_chat_settings: '<div class="setting-component"\n  data-name="Model Platform"\n  data-setting="chat_model_platform_key"\n  data-type="dropdown"\n  data-description="Select a model platform to use with Smart Chat."\n  <%- chat_platforms.map((platform, i) => `data-option-${i + 1}="${platform.key}|${platform.description}"`).join(\'\\n\') %>\n  data-callback="changed_smart_chat_model"\n></div>\n<% if(chat_platform?.fetch_models) { %>\n  <% if(settings[settings.chat_model_platform_key]?.api_key) { %>\n    <div class="setting-component"\n      data-name="Model Name"\n      data-type="dropdown"\n      data-setting="<%= settings.chat_model_platform_key %>.model_name"\n      data-callback="changed_smart_chat_model"\n      <%- platform_chat_models.map((model, i) => `data-option-${i}="${model.key}|${model.model_name} (${model.description})"`).join(\'\\n\') %>\n    ></div>\n  <% } %>\n  <% if(!platform_chat_models.length) { %>\n    <div class="setting-component"\n      data-name="Refresh Models List"\n      data-type="button"\n      data-callback="changed_smart_chat_model"\n    ></div>\n  <% } %>\n  <div class="setting-component"\n    data-name="<%= chat_platform.description %> API Key"\n    data-type="text"\n    data-setting="<%= settings.chat_model_platform_key %>.api_key"\n    <% if(chat_platform.signup_url) { %>\n      data-description="<a href=\'<%= chat_platform.signup_url %>\'>Get API Key</a> for <%= chat_platform.description %>."\n    <% } else { %>\n      data-description="API Key for <%= chat_platform.description %>."\n    <% } %>\n    data-placeholder="Enter an API Key"\n    data-button="Save"\n    data-callback="test_chat_api_key"\n  ></div>\n<% } %>\n<% if (settings.chat_model_platform_key.startsWith(\'custom_local\')) { %>\n  <h3>Custom Local Model</h3>\n  <div class="setting-component"\n    data-name="Model Name"\n    data-type="text"\n    data-setting="custom_local.model_name"\n    data-description="Name of the custom model."\n    data-placeholder="Enter a model name"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="protocol"\n    data-type="text"\n    data-setting="custom_local.protocol"\n    data-description="Protocol for chat server (http or https)."\n    data-placeholder="Enter a protocol"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="hostname"\n    data-type="text"\n    data-setting="custom_local.hostname"\n    data-description="Host for local chat server."\n    data-placeholder="Enter a host"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="port"\n    data-type="number"\n    data-setting="custom_local.port"\n    data-description="Port for local chat server."\n    data-placeholder="Enter a port number"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="path"\n    data-type="text"\n    data-setting="custom_local.path"\n    data-description="Path for local chat server."\n    data-placeholder="Enter a path"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="streaming"\n    data-type="toggle"\n    data-setting="custom_local.streaming"\n    data-description="Enable streaming for local chat server. Disable if you are getting CORS errors."\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="Max input tokens"\n    data-description="Maximum number of tokens for input to the model."\n    data-type="number"\n    data-setting="custom_local.max_input_tokens"\n    data-placeholder="Enter a number"\n    data-callback="changed_smart_chat_model"\n  ></div>\n<% } else if(settings.chat_model_platform_key.startsWith(\'custom_api\')) { %>\n  <h3>Custom Server</h3>\n  <div class="setting-component"\n    data-name="Model Name"\n    data-type="text"\n    data-setting="custom_api.model_name"\n    data-description="Name of the custom model."\n    data-placeholder="Enter a model name"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="protocol"\n    data-type="text"\n    data-setting="custom_api.protocol"\n    data-description="Protocol for chat server (http or https)."\n    data-placeholder="Enter a protocol"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="hostname"\n    data-type="text"\n    data-setting="custom_api.hostname"\n    data-description="Host for chat server."\n    data-placeholder="Enter a host"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="path"\n    data-type="text"\n    data-setting="custom_api.path"\n    data-description="Path for chat server."\n    data-placeholder="Enter a path"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="streaming"\n    data-type="toggle"\n    data-setting="custom_api.streaming"\n    data-description="Enable streaming for chat server. Disable if you are getting CORS errors."\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="Max input tokens"\n    data-description="Maximum number of tokens for input to the model."\n    data-type="number"\n    data-setting="custom_api.max_input_tokens"\n    data-placeholder="Enter a number"\n    data-callback="changed_smart_chat_model"\n  ></div>\n  <div class="setting-component"\n    data-name="API Key"\n    data-type="text"\n    data-setting="custom_api.api_key"\n    data-description="API Key for the custom server sent as a header (bearer token)."\n    data-placeholder="Enter an API Key"\n    data-button="Save"\n    data-callback="test_chat_api_key"\n  ></div>\n<% } %>',
      smart_chat_system_msg: '<div class="sc-<%= role %>">\n  <div class="" data-content="<%= content %>">\n    <span><%= content %></span>\n  </div>\n</div>',
      smart_connections: `<div class="sc-top-bar">
  <p class="sc-context">
    <%- current_path %>
    <%- this.notes %> (<%- this.blocks %>)
  </p>
  <button class="sc-fold-all"><%- this.get_icon('fold-vertical') %></button>
  <button class="sc-unfold-all"><%- this.get_icon('unfold-vertical') %></button>
  <button class="sc-search-button" style="display: none;"><%- this.get_icon('search') %></button>
  <button title="Settings"><%- this.get_icon('gear') %></button>
</div>
<div class="sc-list">
  <% for (let result of results) { %>
  <div class="search-result<%- !this.settings.expanded_view ? ' sc-collapsed' : '' %>" data-path="<%- result.path %>">
    <span class="header">
      <%- this.get_icon('right-triangle') %>
      <a class="search-result-file-title" title="<%- result.path %>" draggable="true">
        <small><%- [result.score?.toFixed(2), result.name].join(' | ') %></small>
      </a>
    </span>
    <ul draggable="true">
      <li class="search-result-file-title" title="<%- result.path %>" data-collection="<%= result.collection_name %>"></li>
    </ul>
  </div>
  <% } %>
</div>
<div id="settings"></div>
<%- this.attribution %>`,
      smart_embed_settings: `<div class="setting-component"
  data-name="Notes Embedding Model"
  data-setting="smart_notes_embed_model"
  data-type="dropdown"
  data-description="Select a model to use for embedding your notes."
  <%- embedding_models.map((model, i) => \`data-option-\${i + 1}="\${model.key}|\${model.name} (\${model.description})"\`).join('\\n') %>
  data-callback="restart_plugin"
></div>
<div class="setting-component"
  data-name="Blocks Embedding Model"
  data-setting="smart_blocks_embed_model"
  data-type="dropdown"
  data-description="Select a model to use for embedding your blocks."
  data-option-0="None|None"
  <%- embedding_models.map((model, i) => \`data-option-\${i + 1}="\${model.key}|\${model.name} (\${model.description})"\`).join('\\n') %>
  data-callback="restart_plugin"
></div>
<div class="setting-component"
  data-name="Minimum Embedding Length"
  data-description="Minimum length of note to embed."
  data-type="number"
  data-setting="embed_input_min_chars"
  data-placeholder="Enter a number"
  data-callback="reload_env"
></div>
<% if(!settings.smart_notes_embed_model.includes('/') || !settings.smart_blocks_embed_model.includes('/')) { %>
<div class="setting-component"
  data-name="OpenAI API Key for embeddings"
  data-type="text"
  data-setting="api_key"
  data-placeholder="Enter your OpenAI API Key"
  data-button="Save"
  data-callback="test_api_key_openai_embeddings"
></div>
<% } %>
<% if(settings.smart_notes_embed_model.includes('/') || settings.smart_blocks_embed_model.includes('/')) { %>
<div class="setting-component"
  data-name="Local Embedding Max Tokens"
  data-description="Reduce max tokens depending on available resources (CPU, RAM)." 
  data-type="dropdown"
  data-setting="local_embedding_max_tokens"
  data-option-1="512"
  data-option-2="1024"
  data-option-3="2048|2048 (default)"
  data-option-4="4096"
  data-option-5="8192"
  data-callback="reload_env"
></div>

<div class="setting-component"
  data-name="Connect to Smart Connect"
  data-description="<a href='https://github.com/brianpetro/smart-connect'>Smart Connect</a> is free to use for faster local embeddings."
  data-type="button"
  data-callback="connect_to_smart_connect"
></div>
<% } %>
<div class="setting-component"
  data-name="Show Full Path"
  data-description="Show full path in view."
  data-type="toggle"
  data-setting="show_full_path"
  data-callback="refresh_smart_view"
></div>`,
      smart_settings: `<h1>Smart Connections</h1>
<% if(this.env.plugin.EARLY_ACCESS && this.env.plugin.obsidian.Platform.isMobile && !this.env.plugin.settings.enable_mobile) { %>
<div data-callout-metadata="" data-callout-fold="" data-callout="warning" class="callout"><div class="callout-title"><div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></div><div class="callout-title-inner">Mobile is DISABLED.</div></div><div class="callout-content">
<p>Toggle "Enable mobile" setting to activate mobile.</p>
</div></div>
<% } %>
<div data-callout-metadata="" data-callout-fold="" data-callout="info" class="callout">
  <div class="callout-title">
    <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="svg-icon lucide-info">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg></div>
    <div class="callout-title-inner">
      <blockquote>
        <p><b>User Agreement:</b> By using Smart Connections you agree to share how it helps you with at least one other person
          \u{1F60A}\u{1F334}</p>
      </blockquote>
    </div>
  </div>
</div>
<div class="sc-supporters">
  <h1>Supporter Community</h1>
  <% if(!this.env.plugin.EARLY_ACCESS){ %>
  <p>The success of Smart Connections is a direct result of our community of supporters who generously fund and evaluate new features. Their unwavering commitment to our privacy-focused, open-source software benefits all. Together, we can continue to innovate and make a positive impact on the world.</p>
  <p><b>Supporter benefits include:</b></p>
  <ul>
    <li>Early access to new &amp; experimental features:
      <ul>
        <li>Early access to new versions enables supporters to help ensure new features are ready for the broader community.</li>
        <li><i>Available in v2.2 (Early Release):</i><ul>
          <li>\u{1F5BC}\uFE0F Multimodal Smart Chat (images)</li>
          <li>\u{1F4F2} Mobile compatibility</li>
        </ul></li>
        <li><i>Coming soon:</i><ul>
          <li>Re-ranking in the Smart View</li>
          <li>Actions in the Smart Chat</li>
          <li>Advanced filters in the Smart View</li>
        </ul></li>
      </ul>
    </li>
    <li>Access to the supporter-only <a href="https://chat.smartconnections.app">private chat</a>:
      <ul>
        <li><i>Community:</i>
          <ul>
            <li>Ask questions and share insights with other supporters.</li>
          </ul>
        </li>
        <li><i>Help &amp; Support (priority):</i>
          <ul>
            <li>Swift, top-priority support in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
          </ul>
        </li>
        <li><i>Feature Requests (priority):</i>
          <ul>
            <li>Influence the future of Smart Connections with priority feature requests in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
          </ul>
        </li>
        <li><i>Insider Updates:</i>
          <ul>
            <li>Learn about the latest features &amp; improvements before they are announced.</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><b>For a very limited time:</b> Early access to Smart Connect: Use ChatGPT with your notes <i>without</i> uploading your notes to the cloud using <a href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connect-obsidian">Smart Connect - Obsidian</a> GPT.</li>
  </ul>
  <% } %>
  <div class="setting-component"
    data-name="Supporter License Key"
    data-type="text"
    data-setting="license_key"
    data-description="Note: this is not required to use Smart Connections."
    data-placeholder="Enter your license_key"
  ></div>
  <div class="setting-component"
    data-name="Smart Connect - Obsidian GPT"
    data-btn-text="Open GPT"
    data-description='Chat with your notes in ChatGPT without uploading your notes to the cloud!'
    data-type="button"
    data-href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connections-2"
  ></div>
  <div class="setting-component"
    data-name="Enable Mobile (EXPERIMENTAL)"
    data-description="Enable mobile support for Smart Connections."
    data-type="toggle"
    <%- this.env.plugin.EARLY_ACCESS ? '' : 'data-disabled=true' %>
    data-setting="enable_mobile"
    data-callback="toggle_mobile"
  ></div>
  <div class="setting-component"
    data-name="Open Supporter Community Chat"
    data-btn-text="Open Chat"
    data-description='Join the supporter community chat.'
    data-type="button"
    data-href="https://chat.smartconnections.app"
  ></div>
  <% if(!this.env.plugin.EARLY_ACCESS){ %>
  <div class="setting-component"
    data-name="Upgrade to Early Access Version (v2.2)"
    data-description="Upgrade to v2.2 (Early Access) to access new features and improvements."
    data-type="button"
    data-btn-text="Upgrade to v2.2"
    data-callback="upgrade_to_early_access"
  ></div>
  <div class="setting-component"
    data-name="Become a Supporter"
    data-description="Become a Supporter"
    data-type="button"
    data-href="https://buy.stripe.com/9AQ7sWemT48u1LGcN4"
  ></div>
  <% } %>
</div>
<h1>Smart View & Embeddings</h1>
<p>Notes about embedding models:</p>
<ul>
  <li>Local model compatibility depends on available CPU and RAM. Try reducing the max tokens (context) if a local model if failing.</li>
  <li>API models are not dependent on local compute, but they require an API key and send your notes to third-party servers for processing.</li>
</ul>
<%- smart_embed_settings %>
<h1>Smart Chat</h1>
<%- smart_chat_settings %>
<h3>System Prompts</h3>
<div class="setting-component"
  data-name="System Prompts Folder"
  data-description="Folder to store system prompts. Available in chat by typing '@'"
  data-type="text"
  data-setting="system_prompts_folder"
  data-placeholder="Enter a folder name"
  data-callback="update_system_prompts_folder"
  data-button="Save"
></div>
<div class="setting-component"
  data-name="Default Language"
  data-setting="language"
  data-type="dropdown"
  data-description="Default language to use for Smart Chat. Changes which self-referential pronouns will trigger lookup of your notes."
  data-option-1="en|English"
  data-option-2="es|Spanish"
  data-option-3="fr|French"
  data-option-4="de|German"
  data-option-5="it|Italian"
  data-callback="update_language"
></div>
<span id="self-referential-pronouns">Current: my, I, me, mine, our, ours, us, we</span>
<h1>Exclusions</h1>
<p id="file-counts">Included files: <%= included_files %> / Total files: <%= total_files %></p>
<div class="setting-component"
  data-name="File Exclusions"
  data-description="'Excluded file' matchers separated by a comma."
  data-type="text"
  data-setting="file_exclusions"
  data-placeholder="drawings,prompts/logs"
  data-callback="update_exclusions"
></div>
<div class="setting-component"
  data-name="Folder Exclusions"
  data-description="'Excluded folder' matchers separated by a comma."
  data-type="text"
  data-setting="folder_exclusions"
  data-placeholder="drawings,prompts/logs"
  data-callback="update_exclusions"
></div>
<div class="setting-component"
  data-name="Exclude all top-level folders"
  data-description="Set folder exclusions to exclude all top-level folders."
  data-type="button"
  data-callback="exclude_all_top_level_folders"
></div>
<div class="setting-component"
  data-name="Heading Exclusions"
  data-description="'Excluded header' matchers separated by a comma. Works for 'blocks' only."
  data-type="text"
  data-setting="excluded_headings"
  data-placeholder="drawings,prompts/logs"
></div>
<h3>Data Management</h3>
<div class="setting-component"
  data-name="Refresh Notes"
  data-description="Clear notes data and reprocess."
  data-type="button"
  data-callback="refresh_notes"
></div>
<div class="setting-component"
  data-name="Smart Connections Folder"
  data-description="Folder to store Smart Connections data."
  data-type="text"
  data-setting="smart_connections_folder"
  data-placeholder="Enter a folder name"
  data-callback="update_smart_connections_folder"
  data-button="rename"
></div>
<div class="setting-component"
  data-name="Smart Chat History Folder"
  data-description="Folder to store Smart Chat history."
  data-type="text"
  data-setting="smart_chat_folder"
  data-placeholder="Enter a folder name"
  data-callback="update_smart_chat_folder"
  data-button="rename"
></div>
<div class="setting-component"
  data-name="Embedding file per note (EXPERIMENTAL)"
  data-description="Save embedding data in a separate file per note."
  data-type="toggle"
  data-setting="embedding_file_per_note"
  data-callback="restart_plugin"
></div>
<h1>Force Refresh</h1>
<div class="setting-component"
  data-name="force_refresh"
  data-description="WARNING: DO NOT use unless you know what you are doing! This will delete all of your current embeddings from OpenAI and trigger reprocessing of your entire vault!"
  data-confirm="Are you sure you want to Force Refresh? By clicking yes you confirm that you understand the consequences of this action."
  data-type="button"
  data-callback="force_refresh"
></div>
<h1>Muted Notices</h1>
<% if(muted_notices && Object.keys(muted_notices).length) { %>
  <% for(const notice in muted_notices) { %>
    <div class="setting-component"
      data-name="<%= notice %>"
      data-setting="muted_notices.<%= notice %>"
      data-type="button"
      data-btn-text="Unmute"
      data-callback="unmute_notice"
    ></div>
  <% } %>
<% } else { %>
  <p>No muted notices.</p>
<% } %>
<hr>
<h5 name="og-gpt" id="og-gpt">The Original Smart Connections GPT</h5>
<div data-callout-metadata="" data-callout-fold="" data-callout="warning" class="callout">
  <div class="callout-title">
    <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="svg-icon lucide-alert-triangle">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg></div>
    <div class="callout-title-inner"><p><i>This will be removed in a future version.</i> Please use the <a href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connect-obsidian">Smart Connect - Obsidian</a> GPT for more advanced features like creating notes and embedding search.</p></div>
  </div>
</div>
<p>This GPT can browser folders and read notes. It requires manually synchronization for your notes to be accessible by ChatGPT.</p>
<div class="setting-component"
  data-name="ChatGPT Integration (supporter-only)"
  data-btn-text="Sync Notes"
  data-description="Sync your notes for use with the Smart Connections GPT and ChatGPT Plugin. Respects your file and folder exclusion settings. Required to use the Smart Connections GPT."
  data-type="button"
  data-callback="sync_for_chatgpt"
></div>
<div class="setting-component"
  data-name="Open Smart Connections GPT"
  data-btn-text="Open"
  data-description='Chat with your notes in ChatGPT. Requires a ChatGPT Plus account.'
  data-type="button"
  data-href="https://chat.openai.com/g/g-SlDDp07bm-smart-connections-for-obsidian"
></div>
<hr>
<% if(this.env.plugin.EARLY_ACCESS){ %>
<div class="setting-component"
  data-name="Revert to Stable Release"
  data-btn-text="Revert"
  data-description='Revert to the stable release of Smart Connections. Requires "Check for Updates" and then "Update Plugin" to complete the process.'
  data-type="button"
  data-callback="revert_to_stable_release"
></div>
<% } %>
`
    };
  }
});

// ejs.min.js
var require_ejs_min = __commonJS({
  "ejs.min.js"(exports2, module2) {
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.ejs = f();
      }
    })(function() {
      var define2, module3, exports3;
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }()({ 1: [function(require2, module4, exports4) {
        "use strict";
        var fs = require2("fs");
        var path = require2("path");
        var utils = require2("./utils");
        var scopeOptionWarned = false;
        var _VERSION_STRING = require2("../package.json").version;
        var _DEFAULT_OPEN_DELIMITER = "<";
        var _DEFAULT_CLOSE_DELIMITER = ">";
        var _DEFAULT_DELIMITER = "%";
        var _DEFAULT_LOCALS_NAME = "locals";
        var _NAME = "ejs";
        var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
        var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
        var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
        var _BOM = /^\uFEFF/;
        var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        exports4.cache = utils.cache;
        exports4.fileLoader = fs.readFileSync;
        exports4.localsName = _DEFAULT_LOCALS_NAME;
        exports4.promiseImpl = new Function("return this;")().Promise;
        exports4.resolveInclude = function(name, filename, isDir) {
          var dirname = path.dirname;
          var extname = path.extname;
          var resolve = path.resolve;
          var includePath = resolve(isDir ? filename : dirname(filename), name);
          var ext = extname(name);
          if (!ext) {
            includePath += ".ejs";
          }
          return includePath;
        };
        function resolvePaths(name, paths) {
          var filePath;
          if (paths.some(function(v) {
            filePath = exports4.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })) {
            return filePath;
          }
        }
        function getIncludePath(path2, options) {
          var includePath;
          var filePath;
          var views = options.views;
          var match = /^[A-Za-z]+:\\|^\//.exec(path2);
          if (match && match.length) {
            path2 = path2.replace(/^\/*/, "");
            if (Array.isArray(options.root)) {
              includePath = resolvePaths(path2, options.root);
            } else {
              includePath = exports4.resolveInclude(path2, options.root || "/", true);
            }
          } else {
            if (options.filename) {
              filePath = exports4.resolveInclude(path2, options.filename);
              if (fs.existsSync(filePath)) {
                includePath = filePath;
              }
            }
            if (!includePath && Array.isArray(views)) {
              includePath = resolvePaths(path2, views);
            }
            if (!includePath && typeof options.includer !== "function") {
              throw new Error('Could not find the include file "' + options.escapeFunction(path2) + '"');
            }
          }
          return includePath;
        }
        function handleCache(options, template) {
          var func;
          var filename = options.filename;
          var hasTemplate = arguments.length > 1;
          if (options.cache) {
            if (!filename) {
              throw new Error("cache option requires a filename");
            }
            func = exports4.cache.get(filename);
            if (func) {
              return func;
            }
            if (!hasTemplate) {
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
          } else if (!hasTemplate) {
            if (!filename) {
              throw new Error("Internal EJS error: no file name or template provided");
            }
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
          func = exports4.compile(template, options);
          if (options.cache) {
            exports4.cache.set(filename, func);
          }
          return func;
        }
        function tryHandleCache(options, data, cb) {
          var result;
          if (!cb) {
            if (typeof exports4.promiseImpl == "function") {
              return new exports4.promiseImpl(function(resolve, reject) {
                try {
                  result = handleCache(options)(data);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              throw new Error("Please provide a callback function");
            }
          } else {
            try {
              result = handleCache(options)(data);
            } catch (err) {
              return cb(err);
            }
            cb(null, result);
          }
        }
        function fileLoader(filePath) {
          return exports4.fileLoader(filePath);
        }
        function includeFile(path2, options) {
          var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
          opts.filename = getIncludePath(path2, opts);
          if (typeof options.includer === "function") {
            var includerResult = options.includer(path2, opts.filename);
            if (includerResult) {
              if (includerResult.filename) {
                opts.filename = includerResult.filename;
              }
              if (includerResult.template) {
                return handleCache(opts, includerResult.template);
              }
            }
          }
          return handleCache(opts);
        }
        function rethrow(err, str, flnm, lineno, esc) {
          var lines = str.split("\n");
          var start = Math.max(lineno - 3, 0);
          var end = Math.min(lines.length, lineno + 3);
          var filename = esc(flnm);
          var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
          }).join("\n");
          err.path = filename;
          err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
          throw err;
        }
        function stripSemi(str) {
          return str.replace(/;(\s*$)/, "$1");
        }
        exports4.compile = function compile(template, opts) {
          var templ;
          if (opts && opts.scope) {
            if (!scopeOptionWarned) {
              console.warn("`scope` option is deprecated and will be removed in EJS 3");
              scopeOptionWarned = true;
            }
            if (!opts.context) {
              opts.context = opts.scope;
            }
            delete opts.scope;
          }
          templ = new Template(template, opts);
          return templ.compile();
        };
        exports4.render = function(template, d, o) {
          var data = d || utils.createNullProtoObjWherePossible();
          var opts = o || utils.createNullProtoObjWherePossible();
          if (arguments.length == 2) {
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
          }
          return handleCache(opts, template)(data);
        };
        exports4.renderFile = function() {
          var args = Array.prototype.slice.call(arguments);
          var filename = args.shift();
          var cb;
          var opts = { filename };
          var data;
          var viewOpts;
          if (typeof arguments[arguments.length - 1] == "function") {
            cb = args.pop();
          }
          if (args.length) {
            data = args.shift();
            if (args.length) {
              utils.shallowCopy(opts, args.pop());
            } else {
              if (data.settings) {
                if (data.settings.views) {
                  opts.views = data.settings.views;
                }
                if (data.settings["view cache"]) {
                  opts.cache = true;
                }
                viewOpts = data.settings["view options"];
                if (viewOpts) {
                  utils.shallowCopy(opts, viewOpts);
                }
              }
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }
            opts.filename = filename;
          } else {
            data = utils.createNullProtoObjWherePossible();
          }
          return tryHandleCache(opts, data, cb);
        };
        exports4.Template = Template;
        exports4.clearCache = function() {
          exports4.cache.reset();
        };
        function Template(text, opts) {
          opts = opts || utils.createNullProtoObjWherePossible();
          var options = utils.createNullProtoObjWherePossible();
          this.templateText = text;
          this.mode = null;
          this.truncate = false;
          this.currentLine = 1;
          this.source = "";
          options.client = opts.client || false;
          options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
          options.compileDebug = opts.compileDebug !== false;
          options.debug = !!opts.debug;
          options.filename = opts.filename;
          options.openDelimiter = opts.openDelimiter || exports4.openDelimiter || _DEFAULT_OPEN_DELIMITER;
          options.closeDelimiter = opts.closeDelimiter || exports4.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
          options.delimiter = opts.delimiter || exports4.delimiter || _DEFAULT_DELIMITER;
          options.strict = opts.strict || false;
          options.context = opts.context;
          options.cache = opts.cache || false;
          options.rmWhitespace = opts.rmWhitespace;
          options.root = opts.root;
          options.includer = opts.includer;
          options.outputFunctionName = opts.outputFunctionName;
          options.localsName = opts.localsName || exports4.localsName || _DEFAULT_LOCALS_NAME;
          options.views = opts.views;
          options.async = opts.async;
          options.destructuredLocals = opts.destructuredLocals;
          options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
          if (options.strict) {
            options._with = false;
          } else {
            options._with = typeof opts._with != "undefined" ? opts._with : true;
          }
          this.opts = options;
          this.regex = this.createRegex();
        }
        Template.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" };
        Template.prototype = { createRegex: function() {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
          return new RegExp(str);
        }, compile: function() {
          var src;
          var fn;
          var opts = this.opts;
          var prepended = "";
          var appended = "";
          var escapeFn = opts.escapeFunction;
          var ctor;
          var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
          if (!this.source) {
            this.generateSource();
            prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error("outputFunctionName is not a valid JS identifier.");
              }
              prepended += "  var " + opts.outputFunctionName + " = __append;\n";
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error("localsName is not a valid JS identifier.");
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                }
                if (i > 0) {
                  destructuring += ",\n  ";
                }
                destructuring += name + " = __locals." + name;
              }
              prepended += destructuring + ";\n";
            }
            if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {\n";
              appended += "  }\n";
            }
            appended += "  return __output;\n";
            this.source = prepended + this.source + appended;
          }
          if (opts.compileDebug) {
            src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
          } else {
            src = this.source;
          }
          if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
            if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
            }
          }
          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
          }
          try {
            if (opts.async) {
              try {
                ctor = new Function("return (async function(){}).constructor;")();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error("This environment does not support async/await");
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }
              e.message += " while compiling ejs\n\n";
              e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
              e.message += "https://github.com/RyanZim/EJS-Lint";
              if (!opts.async) {
                e.message += "\n";
                e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
              }
            }
            throw e;
          }
          var returnedFn = opts.client ? fn : function anonymous(data) {
            var include = function(path2, includeData) {
              var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
              if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }
              return includeFile(path2, opts)(d);
            };
            return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
          };
          if (opts.filename && typeof Object.defineProperty === "function") {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, "name", { value: basename, writable: false, enumerable: false, configurable: true });
            } catch (e) {
            }
          }
          return returnedFn;
        }, generateSource: function() {
          var opts = this.opts;
          if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
          }
          this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
          var self2 = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          if (matches && matches.length) {
            matches.forEach(function(line, index) {
              var closing;
              if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                closing = matches[index + 2];
                if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }
              self2.scanLine(line);
            });
          }
        }, parseTemplateText: function() {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;
          while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }
          if (str) {
            arr.push(str);
          }
          return arr;
        }, _addOutput: function(line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");
            this.truncate = false;
          }
          if (!line) {
            return line;
          }
          line = line.replace(/\\/g, "\\\\");
          line = line.replace(/\n/g, "\\n");
          line = line.replace(/\r/g, "\\r");
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")\n';
        }, scanLine: function(line) {
          var self2 = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;
          newLineCount = line.split("\n").length - 1;
          switch (line) {
            case o + d:
            case o + d + "_":
              this.mode = Template.modes.EVAL;
              break;
            case o + d + "=":
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + "-":
              this.mode = Template.modes.RAW;
              break;
            case o + d + "#":
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
              break;
            case d + c:
            case "-" + d + c:
            case "_" + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }
              this.mode = null;
              this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
              break;
            default:
              if (this.mode) {
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }
                }
                switch (this.mode) {
                  case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";
                    break;
                  case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                    break;
                  case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")\n";
                    break;
                  case Template.modes.COMMENT:
                    break;
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              } else {
                this._addOutput(line);
              }
          }
          if (self2.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += "    ; __line = " + this.currentLine + "\n";
          }
        } };
        exports4.escapeXML = utils.escapeXML;
        exports4.__express = exports4.renderFile;
        exports4.VERSION = _VERSION_STRING;
        exports4.name = _NAME;
        if (typeof window != "undefined") {
          window.ejs = exports4;
        }
      }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function(require2, module4, exports4) {
        "use strict";
        var regExpChars = /[|\\{}()[\]^$+*?.]/g;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasOwn = function(obj, key) {
          return hasOwnProperty.apply(obj, [key]);
        };
        exports4.escapeRegExpChars = function(string) {
          if (!string) {
            return "";
          }
          return String(string).replace(regExpChars, "\\$&");
        };
        var _ENCODE_HTML_RULES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" };
        var _MATCH_HTML = /[&<>'"]/g;
        function encode_char(c) {
          return _ENCODE_HTML_RULES[c] || c;
        }
        var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
        exports4.escapeXML = function(markup) {
          return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
        };
        function escapeXMLToString() {
          return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
        }
        try {
          if (typeof Object.defineProperty === "function") {
            Object.defineProperty(exports4.escapeXML, "toString", { value: escapeXMLToString });
          } else {
            exports4.escapeXML.toString = escapeXMLToString;
          }
        } catch (err) {
          console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
        }
        exports4.shallowCopy = function(to, from) {
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var p in from) {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
          return to;
        };
        exports4.shallowCopyFromList = function(to, from, list) {
          list = list || [];
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var i = 0; i < list.length; i++) {
              var p = list[i];
              if (typeof from[p] != "undefined") {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
          }
          return to;
        };
        exports4.cache = { _data: {}, set: function(key, val) {
          this._data[key] = val;
        }, get: function(key) {
          return this._data[key];
        }, remove: function(key) {
          delete this._data[key];
        }, reset: function() {
          this._data = {};
        } };
        exports4.hyphenToCamel = function(str) {
          return str.replace(/-[a-z]/g, function(match) {
            return match[1].toUpperCase();
          });
        };
        exports4.createNullProtoObjWherePossible = function() {
          if (typeof Object.create == "function") {
            return function() {
              return /* @__PURE__ */ Object.create(null);
            };
          }
          if (!({ __proto__: null } instanceof Object)) {
            return function() {
              return { __proto__: null };
            };
          }
          return function() {
            return {};
          };
        }();
      }, {}], 3: [function(require2, module4, exports4) {
      }, {}], 4: [function(require2, module4, exports4) {
        (function(process2) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports4.resolve = function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process2.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports4.normalize = function(path) {
            var isAbsolute = exports4.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports4.isAbsolute = function(path) {
            return path.charAt(0) === "/";
          };
          exports4.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports4.normalize(filter(paths, function(p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports4.relative = function(from, to) {
            from = exports4.resolve(from).substr(1);
            to = exports4.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "")
                  break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "")
                  break;
              }
              if (start > end)
                return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports4.sep = "/";
          exports4.delimiter = ":";
          exports4.dirname = function(path) {
            if (typeof path !== "string")
              path = path + "";
            if (path.length === 0)
              return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1)
              return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string")
              path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1)
              return "";
            return path.slice(start, end);
          }
          exports4.basename = function(path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports4.extname = function(path) {
            if (typeof path !== "string")
              path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1)
                  startDot = i;
                else if (preDotState !== 1)
                  preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter)
              return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs))
                res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
            return str.substr(start, len);
          } : function(str, start, len) {
            if (start < 0)
              start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require2("_process"));
      }, { _process: 5 }], 5: [function(require2, module4, exports4) {
        var process2 = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process2.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process2.title = "browser";
        process2.browser = true;
        process2.env = {};
        process2.argv = [];
        process2.version = "";
        process2.versions = {};
        function noop() {
        }
        process2.on = noop;
        process2.addListener = noop;
        process2.once = noop;
        process2.off = noop;
        process2.removeListener = noop;
        process2.removeAllListeners = noop;
        process2.emit = noop;
        process2.prependListener = noop;
        process2.prependOnceListener = noop;
        process2.listeners = function(name) {
          return [];
        };
        process2.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process2.cwd = function() {
          return "/";
        };
        process2.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process2.umask = function() {
          return 0;
        };
      }, {}], 6: [function(require2, module4, exports4) {
        module4.exports = { name: "ejs", description: "Embedded JavaScript templates", keywords: ["template", "engine", "ejs"], version: "3.1.9", author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)", license: "Apache-2.0", bin: { ejs: "./bin/cli.js" }, main: "./lib/ejs.js", jsdelivr: "ejs.min.js", unpkg: "ejs.min.js", repository: { type: "git", url: "git://github.com/mde/ejs.git" }, bugs: "https://github.com/mde/ejs/issues", homepage: "https://github.com/mde/ejs", dependencies: { jake: "^10.8.5" }, devDependencies: { browserify: "^16.5.1", eslint: "^6.8.0", "git-directory-deploy": "^1.5.1", jsdoc: "^4.0.2", "lru-cache": "^4.0.1", mocha: "^10.2.0", "uglify-js": "^3.3.16" }, engines: { node: ">=0.10.0" }, scripts: { test: "mocha -u tdd" } };
      }, {}] }, {}, [1])(1);
    });
  }
});

// src/ScTranslations.json
var require_ScTranslations = __commonJS({
  "src/ScTranslations.json"(exports2, module2) {
    module2.exports = {
      en: {
        pronouns: ["my", "I", "me", "mine", "our", "ours", "us", "we"],
        prompt: "Based on your notes",
        initial_message: "Hi, I'm ChatGPT with access to your notes via Smart Connections. Ask me a question about your notes and I'll try to answer it."
      },
      es: {
        pronouns: ["mi", "yo", "m\xED", "t\xFA"],
        prompt: "Bas\xE1ndose en sus notas",
        initial_message: "Hola, soy ChatGPT con acceso a tus apuntes a trav\xE9s de Smart Connections. Hazme una pregunta sobre tus apuntes e intentar\xE9 responderte."
      },
      fr: {
        pronouns: ["me", "mon", "ma", "mes", "moi", "nous", "notre", "nos", "je", "j'", "m'"],
        prompt: "D'apr\xE8s vos notes",
        initial_message: "Bonjour, je suis ChatGPT et j'ai acc\xE8s \xE0 vos notes via Smart Connections. Posez-moi une question sur vos notes et j'essaierai d'y r\xE9pondre."
      },
      de: {
        pronouns: ["mein", "meine", "meinen", "meiner", "meines", "mir", "uns", "unser", "unseren", "unserer", "unseres"],
        prompt: "Basierend auf Ihren Notizen",
        initial_message: "Hallo, ich bin ChatGPT und habe \xFCber Smart Connections Zugang zu Ihren Notizen. Stellen Sie mir eine Frage zu Ihren Notizen und ich werde versuchen, sie zu beantworten."
      },
      it: {
        pronouns: ["mio", "mia", "miei", "mie", "noi", "nostro", "nostri", "nostra", "nostre"],
        prompt: "Sulla base degli appunti",
        initial_message: "Ciao, sono ChatGPT e ho accesso ai tuoi appunti tramite Smart Connections. Fatemi una domanda sui vostri appunti e cercher\xF2 di rispondervi."
      }
    };
  }
});

// node_modules/smart-chat-model/adapters/anthropic.js
var require_anthropic = __commonJS({
  "node_modules/smart-chat-model/adapters/anthropic.js"(exports2) {
    var AnthropicAdapter = class {
      /**
       * Prepares the request body for the Anthropic API by converting ChatML format to a format compatible with Anthropic.
       * @param {Object} opts - The options object containing messages and other parameters in ChatML format.
       * @returns {Object} The request body formatted for the Anthropic API.
       */
      prepare_request_body(opts) {
        return chatml_to_anthropic(opts);
      }
      /**
       * Counts the tokens in the input by estimating them, as the Anthropic model does not provide a direct method.
       * @param {string|Object} input - The input text or object to count tokens in.
       * @returns {Promise<number>} The estimated number of tokens in the input.
       */
      async count_tokens(input) {
        return this.estimate_tokens(input);
      }
      /**
       * Estimates the number of tokens in the input based on a rough average token size.
       * @param {string|Object} input - The input text or object to estimate tokens in.
       * @returns {number} The estimated number of tokens.
       */
      estimate_tokens(input) {
        if (typeof input === "object")
          input = JSON.stringify(input);
        return Math.ceil(input.length / 6);
      }
      /**
       * Extracts the first tool call from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object|null} The first tool call found, or null if none exist.
       */
      get_tool_call(json) {
        return json.content.find((msg) => msg.type === "tool_use");
      }
      /**
       * Retrieves the input content of a tool call.
       * @param {Object} tool_call - The tool call object from which to extract the input.
       * @returns {Object} The input of the tool call.
       */
      get_tool_call_content(tool_call) {
        return tool_call.input;
      }
      /**
       * Retrieves the name of the tool from a tool call object.
       * @param {Object} tool_call - The tool call object from which to extract the name.
       * @returns {string} The name of the tool.
       */
      get_tool_name(tool_call) {
        return tool_call.name;
      }
      /**
       * Extracts the first message from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object|null} The first message found, or null if none exist.
       */
      get_message(json) {
        var _a;
        return (_a = json.content) == null ? void 0 : _a[0];
      }
      /**
       * Retrieves the content of the first message from the JSON response.
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string|null} The content of the first message, or null if no message is found.
       */
      get_message_content(json) {
        var _a, _b;
        return (_b = this.get_message(json)) == null ? void 0 : _b[(_a = this.get_message(json)) == null ? void 0 : _a.type];
      }
    };
    exports2.AnthropicAdapter = AnthropicAdapter;
    function chatml_to_anthropic(opts) {
      let tool_counter = 0;
      const messages = opts.messages.filter((msg) => msg.role !== "system").map((m) => {
        if (m.role === "tool") {
          return { role: "user", content: [
            {
              type: "tool_result",
              tool_use_id: `tool-${tool_counter}`,
              content: m.content
            }
          ] };
        }
        if (m.role === "assistant" && m.tool_calls) {
          tool_counter++;
          const out2 = {
            role: m.role,
            content: m.tool_calls.map((c) => ({
              type: "tool_use",
              id: `tool-${tool_counter}`,
              name: c.function.name,
              input: typeof c.function.arguments === "string" ? JSON.parse(c.function.arguments) : c.function.arguments
            }))
          };
          if (m.content) {
            if (typeof m.content === "string")
              out2.content.push({ type: "text", text: m.content });
            else
              m.content.forEach((c) => out2.content.push(c));
          }
          return out2;
        }
        if (typeof m.content === "string")
          return { role: m.role, content: m.content };
        if (Array.isArray(m.content)) {
          const content = m.content.map((c) => {
            if (c.type === "text")
              return { type: "text", text: c.text };
            if (c.type === "image_url") {
              const image_url = c.image_url.url;
              let media_type = image_url.split(":")[1].split(";")[0];
              if (media_type === "image/jpg")
                media_type = "image/jpeg";
              return { type: "image", source: { type: "base64", media_type, data: image_url.split(",")[1] } };
            }
          });
          return { role: m.role, content };
        }
        return m;
      });
      const { model, max_tokens, temperature, tools, tool_choice } = opts;
      const last_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && msg.content.includes("---BEGIN"));
      if (last_system_idx > -1) {
        const system_prompt = "<context>\n" + opts.messages[last_system_idx].content + "\n</context>\n";
        messages[messages.length - 1].content = system_prompt + messages[messages.length - 1].content;
      }
      console.log(messages);
      const out = {
        messages,
        model,
        max_tokens,
        temperature
      };
      if (tools) {
        out.tools = tools.map((tool) => ({
          name: tool.function.name,
          description: tool.function.description,
          input_schema: tool.function.parameters
        }));
        if ((tool_choice == null ? void 0 : tool_choice.type) === "function") {
          const tool_prompt = `Use the "${tool_choice.function.name}" tool!`;
          const last_user_idx = out.messages.findLastIndex((msg) => msg.role === "user");
          out.messages[last_user_idx].content += "\n" + tool_prompt;
          out.system = `Required: use the "${tool_choice.function.name}" tool!`;
        }
      }
      const last_non_context_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && !msg.content.includes("---BEGIN"));
      if (last_non_context_system_idx > -1)
        out.system = opts.messages[last_non_context_system_idx].content;
      return out;
    }
    exports2.chatml_to_anthropic = chatml_to_anthropic;
  }
});

// node_modules/smart-chat-model/adapters/cohere.js
var require_cohere = __commonJS({
  "node_modules/smart-chat-model/adapters/cohere.js"(exports2) {
    var CohereAdapter = class {
      /**
       * Converts a ChatML object to a format suitable for a request to the Cohere API.
       * @param {Object} chatml - The ChatML object containing the chat history and other parameters.
       * @returns {Object} The request body formatted for the Cohere API.
       */
      prepare_request_body(chatml) {
        return chatml_to_cohere(chatml);
      }
      /**
       * Extracts the message content from a JSON response from the Cohere API.
       * @param {Object} json - The JSON response object from which to extract the text content.
       * @returns {string} The extracted text content from the response.
       */
      get_message_content(json) {
        return json.text;
      }
      /**
       * Processes streaming data received from the Cohere API and extracts text chunks.
       * This method handles the accumulation of text data over multiple events and manages the state of the stream.
       * @param {Object} event - The event object containing streaming data.
       * @returns {string} The accumulated text chunk extracted from the stream.
       */
      get_text_chunk_from_stream(event) {
        if (!this.last_line_index)
          this.last_line_index = 0;
        clearTimeout(this.last_line_timeout);
        this.last_line_timeout = setTimeout(() => {
          this.last_line_index = 0;
        }, 1e4);
        const data = event.source.xhr.responseText;
        const lines = data.split("\n").slice(this.last_line_index);
        console.log(lines);
        this.last_line_index += lines.length;
        const text_chunk = lines.filter((line) => line.trim() !== "").map((line) => {
          console.log(line);
          const json = JSON.parse(line);
          if (json.event_type === "stream-end") {
            console.log("stream-end");
            this.end_of_stream = true;
            setTimeout(() => {
              this.end_of_stream = false;
            }, 3e3);
            return "";
          }
          return json.text;
        }).join("");
        console.log(text_chunk);
        return text_chunk;
      }
      /**
       * Determines if the end of the stream has been reached based on the event data.
       * @param {Object} event - The event object that may indicate the end of the stream.
       * @returns {boolean} True if the end of the stream is indicated, false otherwise.
       */
      is_end_of_stream(event) {
        return this.end_of_stream;
      }
    };
    exports2.CohereAdapter = CohereAdapter;
    function chatml_to_cohere(chatml) {
      const cohere = {
        model: chatml.model,
        // skip last user message
        chat_history: chatml.messages.slice(0, -1).map((message) => ({
          role: message.role,
          message: parse_message_content_to_string(message)
        })),
        message: parse_message_content_to_string(chatml.messages[chatml.messages.length - 1]),
        temperature: chatml.temperature
        // stream: chatml.stream // currently not supported
      };
      return cohere;
    }
    exports2.chatml_to_cohere = chatml_to_cohere;
    function parse_message_content_to_string(message) {
      return Array.isArray(message.content) ? message.content.filter((c) => c.type === "text").map((c) => c.text).join("\n") : message.content;
    }
  }
});

// node_modules/smart-chat-model/adapters/gemini.js
var require_gemini = __commonJS({
  "node_modules/smart-chat-model/adapters/gemini.js"(exports2) {
    var GeminiAdapter = class {
      /**
       * Constructs a GeminiAdapter instance with a specified model configuration.
       * @param {Object} model - The model configuration object.
       */
      constructor(model) {
        this.model = model;
      }
      /**
       * Prepares the request body for the Gemini API by converting ChatML format to a format compatible with Gemini.
       * @param {Object} body - The options object containing messages and other parameters in ChatML format.
       * @returns {Object} The request body formatted for the Gemini API.
       */
      prepare_request_body(body) {
        return chatml_to_gemini(body);
      }
      /**
       * Extracts the first tool call from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object|null} The first tool call found, or null if none exist.
       */
      get_tool_call(json) {
        var _a, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = (_a = json.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d[0]) == null ? void 0 : _e.functionCall;
      }
      /**
       * Retrieves the name of the tool from a tool call object.
       * @param {Object} tool_call - The tool call object from which to extract the name.
       * @returns {string|null} The name of the tool, or null if not available.
       */
      get_tool_name(tool_call) {
        return tool_call == null ? void 0 : tool_call.name;
      }
      /**
       * Retrieves the input content of a tool call.
       * @param {Object} tool_call - The tool call object from which to extract the input.
       * @returns {Object|null} The input of the tool call, or null if not available.
       */
      get_tool_call_content(tool_call) {
        return tool_call == null ? void 0 : tool_call.args;
      }
      /**
       * Extracts the first message from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object|null} The first message found, or null if none exist.
       */
      get_message(json) {
        var _a;
        return (_a = json.candidates) == null ? void 0 : _a[0];
      }
      /**
       * Retrieves the content of the first message from the JSON response.
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string|null} The content of the first message, or null if no message is found.
       */
      get_message_content(json) {
        var _a, _b;
        return (_b = (_a = this.get_message(json)) == null ? void 0 : _a.content) == null ? void 0 : _b.parts.map((part) => part.text).join("");
      }
      /**
       * Handles escaped newlines in a streaming text chunk.
       * @param {Object} event - The streaming event containing the data.
       * @returns {string} The text chunk with escaped newlines replaced.
       */
      get_text_chunk_from_stream(event) {
        return event.data.replace(/\\n/g, "\n");
      }
      /**
       * Determines if the streaming response has ended based on the readyState of the XMLHttpRequest.
       * @param {Object} event - The streaming event.
       * @returns {boolean} True if the stream has ended, false otherwise.
       */
      is_end_of_stream(event) {
        return event.source.xhr.readyState === 4;
      }
      /**
       * Counts the tokens in the input by making an API request to the Gemini token counting endpoint.
       * @param {string|Object} input - The input text or object to count tokens in.
       * @returns {Promise<number>} The total number of tokens in the input.
       */
      async count_tokens(input) {
        var _a;
        const req = {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:countTokens?key=${this.model.api_key}`,
          method: "POST",
          headers: { "Content-Type": "application/json" }
        };
        let body;
        if (typeof input === "string")
          body = chatml_to_gemini({ messages: [{ role: "user", content: input }] });
        else if (Array.isArray(input))
          body = chatml_to_gemini({ messages: input });
        else if (typeof input === "object")
          body = chatml_to_gemini(input);
        else
          return console.error("Invalid input for count_tokens", input);
        delete body.generationConfig;
        delete body.safetySettings;
        req.body = JSON.stringify(body);
        const resp = await this.model.request_adapter(req);
        return (_a = resp == null ? void 0 : resp.json) == null ? void 0 : _a.totalTokens;
      }
      /**
       * Getter for the standard API endpoint with the API key appended.
       * @returns {string} The formatted endpoint URL for non-streaming requests.
       */
      get endpoint() {
        return this.model.config.endpoint.replace("MODEL_NAME", this.model.model_name) + "?key=" + this.model.api_key;
      }
      /**
       * Getter for the streaming API endpoint with the API key appended.
       * @returns {string} The formatted endpoint URL for streaming requests.
       */
      get endpoint_streaming() {
        return this.model.config.endpoint_streaming.replace("MODEL_NAME", this.model.model_name) + "?key=" + this.model.api_key;
      }
    };
    exports2.GeminiAdapter = GeminiAdapter;
    function chatml_to_gemini(opts) {
      const messages = opts.messages.filter((msg) => msg.role !== "system");
      const last_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && msg.content.includes("---BEGIN"));
      if (last_system_idx > -1) {
        const system_prompt = "---BEGIN IMPORTANT CONTEXT---\n" + opts.messages[last_system_idx].content + "\n---END IMPORTANT CONTEXT---\n\n";
        messages[messages.length - 1].content = system_prompt + messages[messages.length - 1].content;
      }
      const body = {
        contents: messages.filter((msg) => msg.role !== "system").map((msg) => {
          const content = {};
          content.role = msg.role === "assistant" ? "model" : msg.role;
          content.parts = !Array.isArray(msg.content) ? [{ text: msg.content }] : msg.content.map((c) => {
            if (c.type === "text") {
              return { text: c.text };
            }
            if (c.type === "image_url") {
              const image_url = c.image_url.url;
              let mime_type = image_url.split(":")[1].split(";")[0];
              if (mime_type === "image/jpg")
                mime_type = "image/jpeg";
              return { inline_data: { mime_type, data: image_url.split(",")[1] } };
            }
          });
          return content;
          ({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: Array.isArray(msg.content) ? [{ text: msg.content.filter((c) => c.type === "text").map((c) => c.text).join("\n") }] : [{ text: msg.content }]
          });
        }),
        generationConfig: {
          temperature: opts.temperature || 0.9,
          topK: opts.topK || 1,
          topP: opts.topP || 1,
          maxOutputTokens: opts.max_tokens || 2048,
          stopSequences: opts.stopSequences || [],
          candidate_count: opts.n || 1
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      };
      const system_instructions = opts.messages.filter((msg) => msg.role === "system" && !msg.content.includes("---BEGIN"));
      if (system_instructions.length > 0)
        body.systemInstruction = { parts: system_instructions.map((msg) => ({ text: msg.content })) };
      if (opts.tools) {
        body.tools = [{
          function_declarations: opts.tools.map((tool) => ({
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters
          }))
        }];
        body.tool_config = {
          function_calling_config: {
            mode: "ANY"
          }
        };
        const tool_prompt = `Use the "${body.tools[0].function_declarations[0].name}" tool!`;
        const last_user_idx = body.contents.findLastIndex((msg) => msg.role === "user");
        body.contents[last_user_idx].parts[0].text += "\n" + tool_prompt;
      }
      return body;
    }
    exports2.chatml_to_gemini = chatml_to_gemini;
  }
});

// node_modules/smart-chat-model/adapters.js
var require_adapters2 = __commonJS({
  "node_modules/smart-chat-model/adapters.js"(exports2) {
    var { AnthropicAdapter } = require_anthropic();
    var { CohereAdapter } = require_cohere();
    var { GeminiAdapter } = require_gemini();
    exports2.Anthropic = AnthropicAdapter;
    exports2.Cohere = CohereAdapter;
    exports2.Gemini = GeminiAdapter;
  }
});

// node_modules/smart-chat-model/platforms.json
var require_platforms = __commonJS({
  "node_modules/smart-chat-model/platforms.json"(exports2, module2) {
    module2.exports = {
      openai: {
        description: "OpenAI",
        type: "API",
        endpoint: "https://api.openai.com/v1/chat/completions",
        streaming: true,
        actions: true,
        fetch_models: true,
        default_model: "gpt-3.5-turbo",
        signup_url: "https://platform.openai.com/api-keys"
      },
      google_gemini: {
        description: "Google Gemini",
        type: "API",
        api_key_header: "none",
        endpoint: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:generateContent",
        endpoint_streaming: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:streamGenerateContent",
        streaming: true,
        actions: true,
        adapter: "Gemini",
        fetch_models: true,
        default_model: "gemini-1.0-pro",
        signup_url: "https://ai.google.dev/"
      },
      open_router: {
        description: "Open Router",
        type: "API",
        endpoint: "https://openrouter.ai/api/v1/chat/completions",
        streaming: true,
        fetch_models: true,
        default_model: "mistralai/mistral-7b-instruct:free",
        signup_url: "https://accounts.openrouter.ai/sign-up?redirect_url=https%3A%2F%2Fopenrouter.ai%2Fkeys"
      },
      cohere: {
        description: "Cohere Command-R",
        type: "API",
        endpoint: "https://api.cohere.ai/v1/chat",
        streaming: false,
        adapter: "Cohere",
        fetch_models: true,
        default_model: "command-r",
        signup_url: "https://dashboard.cohere.com/welcome/register?redirect_uri=%2Fapi-keys"
      },
      anthropic: {
        description: "Anthropic Claude",
        type: "API",
        endpoint: "https://api.anthropic.com/v1/messages",
        streaming: false,
        api_key_header: "x-api-key",
        headers: {
          "anthropic-version": "2023-06-01",
          "anthropic-beta": "tools-2024-04-04"
        },
        adapter: "Anthropic",
        actions: true,
        fetch_models: true,
        default_model: "claude-3-sonnet-20240229",
        signup_url: "https://console.anthropic.com/login?returnTo=%2Fsettings%2Fkeys"
      },
      custom_local: {
        description: "Custom Local (OpenAI format)",
        type: "API"
      },
      custom_api: {
        description: "Custom API (OpenAI format)",
        type: "API"
      }
    };
  }
});

// node_modules/smart-chat-model/utils/is_valid_tool_call.js
var require_is_valid_tool_call = __commonJS({
  "node_modules/smart-chat-model/utils/is_valid_tool_call.js"(exports2) {
    function is_valid_tool_call(tool, tool_call_content) {
      var _a;
      const props = tool.function.parameters.properties;
      if (Object.keys(tool_call_content).length === 0)
        throw new Error(`Invalid tool call: object is empty`);
      Object.entries(tool_call_content).forEach(([key, value]) => {
        if (!props[key])
          throw new Error(`Invalid tool call: missing key ${key} in tool spec`, props);
        if (Array.isArray(value) && props[key].type === "array") {
          const itemType = typeof value[0];
          if (!value.every((item) => typeof item === itemType))
            throw new Error(`Invalid tool call: array items are not of the same type`);
          if (props[key].items.type !== itemType)
            throw new Error(`Invalid tool call: array items are not of the same type as the spec`);
        } else if (props[key].type !== typeof value) {
          if (props[key].type === "number" && typeof value === "string") {
            if (isNaN(Number(value)))
              throw new Error(`Invalid tool call: value ${value} is not a valid number`);
            tool_call_content[key] = Number(value);
          } else
            throw new Error(`Invalid tool call: value ${value} is not of type ${props[key].type}`);
        }
        if (props[key].enum && !props[key].enum.includes(value))
          throw new Error(`Invalid tool call: value ${value} is not in enum ${props[key].enum}`);
      });
      (_a = tool.function.parameters.required) == null ? void 0 : _a.forEach((key) => {
        if (!tool_call_content[key])
          throw new Error(`Invalid tool call: missing required key ${key}`);
      });
      return true;
    }
    exports2.is_valid_tool_call = is_valid_tool_call;
  }
});

// node_modules/smart-chat-model/streamer.js
var require_streamer = __commonJS({
  "node_modules/smart-chat-model/streamer.js"(exports2) {
    var _setReadyState, setReadyState_fn, _onStreamFailure, onStreamFailure_fn, _onStreamAbort, onStreamAbort_fn, _onStreamProgress, onStreamProgress_fn, _onStreamLoaded, onStreamLoaded_fn, _parseEventChunk, parseEventChunk_fn, _checkStreamClosed, checkStreamClosed_fn;
    var SmartStreamer = class {
      constructor(url, options = {}) {
        // private methods
        __privateAdd(this, _setReadyState);
        __privateAdd(this, _onStreamFailure);
        __privateAdd(this, _onStreamAbort);
        __privateAdd(this, _onStreamProgress);
        __privateAdd(this, _onStreamLoaded);
        __privateAdd(this, _parseEventChunk);
        __privateAdd(this, _checkStreamClosed);
        const {
          method = "GET",
          headers = {},
          body = null,
          withCredentials = false
        } = options;
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.withCredentials = withCredentials;
        this.listeners = {};
        this.readyState = this.CONNECTING;
        this.progress = 0;
        this.chunk = "";
        this.last_event_id = "";
        this.xhr = null;
        this.FIELD_SEPARATOR = ":";
        this.INITIALIZING = -1;
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.CLOSED = 2;
      }
      /**
       * Adds an event listener for the specified event type.
       *
       * @param {string} type - The type of the event.
       * @param {Function} listener - The listener function to be called when the event is triggered.
       */
      addEventListener(type, listener) {
        if (!this.listeners[type])
          this.listeners[type] = [];
        if (!this.listeners[type].includes(listener))
          this.listeners[type].push(listener);
      }
      /**
       * Removes an event listener from the SmartStreamer instance.
       *
       * @param {string} type - The type of event to remove the listener from.
       * @param {Function} listener - The listener function to remove.
       */
      removeEventListener(type, listener) {
        if (!this.listeners[type])
          return;
        this.listeners[type] = this.listeners[type].filter((callback) => callback !== listener);
        if (this.listeners[type].length === 0)
          delete this.listeners[type];
      }
      /**
       * Dispatches an event to the appropriate event handlers.
       *
       * @param {Event} event - The event to be dispatched.
       * @returns {boolean} - Returns true if the event was successfully dispatched, false otherwise.
       */
      dispatchEvent(event) {
        if (!event)
          return true;
        event.source = this;
        const onHandler = "on" + event.type;
        if (Object.prototype.hasOwnProperty.call(this, onHandler)) {
          this[onHandler].call(this, event);
          if (event.defaultPrevented)
            return false;
        }
        if (this.listeners[event.type]) {
          this.listeners[event.type].forEach((callback) => {
            callback(event);
            return !event.defaultPrevented;
          });
        }
        return true;
      }
      /**
       * Initiates the streaming process.
       */
      stream() {
        __privateMethod(this, _setReadyState, setReadyState_fn).call(this, this.CONNECTING);
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener("progress", __privateMethod(this, _onStreamProgress, onStreamProgress_fn).bind(this));
        this.xhr.addEventListener("load", __privateMethod(this, _onStreamLoaded, onStreamLoaded_fn).bind(this));
        this.xhr.addEventListener("readystatechange", __privateMethod(this, _checkStreamClosed, checkStreamClosed_fn).bind(this));
        this.xhr.addEventListener("error", __privateMethod(this, _onStreamFailure, onStreamFailure_fn).bind(this));
        this.xhr.addEventListener("abort", __privateMethod(this, _onStreamAbort, onStreamAbort_fn).bind(this));
        this.xhr.open(this.method, this.url);
        for (const header in this.headers) {
          this.xhr.setRequestHeader(header, this.headers[header]);
        }
        if (this.last_event_id)
          this.xhr.setRequestHeader("Last-Event-ID", this.last_event_id);
        this.xhr.withCredentials = this.withCredentials;
        this.xhr.send(this.body);
      }
      /**
       * Ends the streamer connection.
       * Aborts the current XHR request and sets the ready state to CLOSED.
       */
      end() {
        if (this.readyState === this.CLOSED)
          return;
        this.xhr.abort();
        this.xhr = null;
        __privateMethod(this, _setReadyState, setReadyState_fn).call(this, this.CLOSED);
      }
    };
    _setReadyState = new WeakSet();
    setReadyState_fn = function(state) {
      const event = new CustomEvent("readyStateChange");
      event.readyState = state;
      this.readyState = state;
      this.dispatchEvent(event);
    };
    _onStreamFailure = new WeakSet();
    onStreamFailure_fn = function(e) {
      const event = new CustomEvent("error");
      event.data = e.currentTarget.response;
      this.dispatchEvent(event);
      this.end();
    };
    _onStreamAbort = new WeakSet();
    onStreamAbort_fn = function(e) {
      const event = new CustomEvent("abort");
      this.end();
    };
    _onStreamProgress = new WeakSet();
    onStreamProgress_fn = function(e) {
      if (!this.xhr)
        return;
      if (this.xhr.status !== 200) {
        __privateMethod(this, _onStreamFailure, onStreamFailure_fn).call(this, e);
        return;
      }
      if (this.readyState === this.CONNECTING) {
        this.dispatchEvent(new CustomEvent("open"));
        __privateMethod(this, _setReadyState, setReadyState_fn).call(this, this.OPEN);
      }
      const data = this.xhr.responseText.substring(this.progress);
      this.progress += data.length;
      data.split(/(\r\n|\r|\n)/g).forEach((part) => {
        if (part.trim().length === 0) {
          this.dispatchEvent(__privateMethod(this, _parseEventChunk, parseEventChunk_fn).call(this, this.chunk.trim()));
          this.chunk = "";
        } else {
          this.chunk += part;
        }
      });
    };
    _onStreamLoaded = new WeakSet();
    onStreamLoaded_fn = function(e) {
      __privateMethod(this, _onStreamProgress, onStreamProgress_fn).call(this, e);
      this.dispatchEvent(__privateMethod(this, _parseEventChunk, parseEventChunk_fn).call(this, this.chunk));
      this.chunk = "";
    };
    _parseEventChunk = new WeakSet();
    parseEventChunk_fn = function(chunk) {
      if (!chunk || chunk.length === 0)
        return null;
      const e = { id: null, retry: null, data: "", event: "message", text: "" };
      chunk.split(/(\r\n|\r|\n)/).forEach((line) => {
        line = line.trim();
        const index = line.indexOf(this.FIELD_SEPARATOR);
        if (index <= 0)
          return;
        const field = line.substring(0, index).replace(/^"|"$/g, "");
        if (!["id", "retry", "data", "event", "text"].includes(field))
          return;
        const value = line.substring(index + 1).trim().replace(/^"|"$/g, "");
        e.data += value;
      });
      if (e.id)
        this.last_event_id = e.id;
      const event = new CustomEvent(e.event || "message");
      event.id = e.id;
      event.data = e.data || "";
      event.last_event_id = this.last_event_id;
      return event;
    };
    _checkStreamClosed = new WeakSet();
    checkStreamClosed_fn = function() {
      if (!this.xhr)
        return;
      if (this.xhr.readyState === XMLHttpRequest.DONE)
        __privateMethod(this, _setReadyState, setReadyState_fn).call(this, this.CLOSED);
    };
    exports2.SmartStreamer = SmartStreamer;
  }
});

// node_modules/smart-chat-model/models/open_router.js
var require_open_router = __commonJS({
  "node_modules/smart-chat-model/models/open_router.js"(exports2) {
    async function fetch_open_router_models() {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/models");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Model data retrieved:", data);
        return data.data.map((model) => ({
          model_name: model.id,
          key: model.id,
          max_input_tokens: model.context_length,
          description: model.name,
          actions: model.description.includes("tool use") || model.description.includes("function call"),
          multimodal: model.architecture.modality === "multimodal",
          raw: model
        }));
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_open_router_models = fetch_open_router_models;
  }
});

// node_modules/smart-chat-model/models/openai.js
var require_openai = __commonJS({
  "node_modules/smart-chat-model/models/openai.js"(exports2) {
    var model_context = {
      "gpt-3.5-turbo": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-3.5-turbo-0125": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-3.5-turbo-0301": {
        "context": 4097,
        "max_out": 4097
      },
      "gpt-3.5-turbo-0613": {
        "context": 4097,
        "max_out": 4097
      },
      "gpt-3.5-turbo-1106": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-3.5-turbo-16k": {
        "context": 16385,
        "max_out": 16385
      },
      "gpt-3.5-turbo-16k-0613": {
        "context": 16385,
        "max_out": 16385
      },
      "gpt-4": {
        "context": 8192,
        "max_out": 8192
      },
      "gpt-4-0125-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-0314": {
        "context": 8192,
        "max_out": 8192
      },
      "gpt-4-0613": {
        "context": 8192,
        "max_out": 8192
      },
      "gpt-4-1106-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-1106-vision-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-32k": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4-32k-0314": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4-32k-0613": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4-turbo": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-turbo-2024-04-09": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-turbo-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-vision-preview": {
        "context": 128e3,
        "max_out": 4096
      }
    };
    async function fetch_openai_models(api_key) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        const response = await fetch("https://api.openai.com/v1/models", {
          headers: {
            "Authorization": `Bearer ${api_key}`
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Model data retrieved:", data);
        return data.data.filter((model) => model.id.startsWith("gpt-") && !model.id.includes("-instruct")).map((model) => {
          const out = {
            model_name: model.id,
            key: model.id,
            multimodal: model.id.includes("vision") || model.id.includes("gpt-4-turbo")
          };
          if (model_context[model.id]) {
            out.max_input_tokens = model_context[model.id].context;
            out.description = `context: ${model_context[model.id].context}, output: ${model_context[model.id].max_out}`;
          }
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_openai_models = fetch_openai_models;
  }
});

// node_modules/smart-chat-model/models/google_gemini.js
var require_google_gemini = __commonJS({
  "node_modules/smart-chat-model/models/google_gemini.js"(exports2) {
    async function fetch_google_gemini_models(api_key) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + api_key);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Model data retrieved:", data);
        return data.models.filter((model) => model.name.startsWith("models/gemini")).map((model) => {
          const out = {
            model_name: model.name.split("/").pop(),
            key: model.name.split("/").pop(),
            max_input_tokens: model.inputTokenLimit,
            max_output_tokens: model.maxOutputTokens,
            description: model.description,
            multimodal: model.name.includes("vision") || model.description.includes("multimodal"),
            raw: model
          };
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_google_gemini_models = fetch_google_gemini_models;
  }
});

// node_modules/smart-chat-model/models/cohere.js
var require_cohere2 = __commonJS({
  "node_modules/smart-chat-model/models/cohere.js"(exports2) {
    async function fetch_cohere_models(api_key) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        const response = await fetch("https://api.cohere.ai/v1/models", {
          headers: {
            "Authorization": `Bearer ${api_key}`
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Model data retrieved:", data);
        return data.models.filter((model) => model.name.startsWith("command-")).map((model) => {
          const out = {
            model_name: model.name,
            key: model.name,
            max_input_tokens: model.context_length,
            tokenizer_url: model.tokenizer_url,
            finetuned: model.finetuned,
            description: `Max input tokens: ${model.context_length}, Finetuned: ${model.finetuned}`
          };
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_cohere_models = fetch_cohere_models;
  }
});

// node_modules/smart-chat-model/models/anthropic.js
var require_anthropic2 = __commonJS({
  "node_modules/smart-chat-model/models/anthropic.js"(exports2) {
    async function fetch_anthropic_models() {
      return [
        {
          "key": "claude-3-opus-20240229",
          "model_name": "claude-3-opus-20240229",
          "description": "Anthropic's Claude Opus",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-sonnet-20240229",
          "model_name": "claude-3-sonnet-20240229",
          "description": "Anthropic's Claude Sonnet",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-haiku-20240307",
          "model_name": "claude-3-haiku-20240307",
          "description": "Anthropic's Claude Haiku",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        }
      ];
    }
    exports2.fetch_anthropic_models = fetch_anthropic_models;
  }
});

// node_modules/smart-chat-model/models/fetch.js
var require_fetch = __commonJS({
  "node_modules/smart-chat-model/models/fetch.js"(exports2) {
    var { fetch_open_router_models } = require_open_router();
    var { fetch_openai_models } = require_openai();
    var { fetch_google_gemini_models } = require_google_gemini();
    var { fetch_cohere_models } = require_cohere2();
    var { fetch_anthropic_models } = require_anthropic2();
    exports2.open_router = fetch_open_router_models;
    exports2.openai = fetch_openai_models;
    exports2.google_gemini = fetch_google_gemini_models;
    exports2.cohere = fetch_cohere_models;
    exports2.anthropic = fetch_anthropic_models;
  }
});

// node_modules/smart-chat-model/smart_chat_model.js
var require_smart_chat_model = __commonJS({
  "node_modules/smart-chat-model/smart_chat_model.js"(exports2) {
    var adapters = require_adapters2();
    var platforms = require_platforms();
    var { is_valid_tool_call } = require_is_valid_tool_call();
    var { SmartStreamer } = require_streamer();
    var fetch_models = require_fetch();
    var SmartChatModel = class {
      /**
       * Constructs an instance of SmartChatModel with specified environment, model key, and options.
       * @param {Object} main - The main environment context, typically containing configurations and state.
       * @param {string} platform_key - Key to select the specific model configuration from models.json.
       * @param {Object} model_config - Optional parameters to override model configurations.
       */
      constructor(main, platform_key, model_config = {}) {
        this.env = main;
        this.main = this.env;
        this.config = {
          ...platforms[platform_key] || {},
          ...model_config
          // override default platform config
        };
        this.platform_key = platform_key;
        this.active_stream = null;
        this._request_adapter = null;
        this.platforms = platforms;
        if (this.config.adapter)
          this.adapter = new adapters[this.config.adapter](this);
        console.log(this.adapter);
      }
      static get models() {
        return platforms;
      }
      get default_opts() {
        return {
          temperature: 0.3,
          top_p: 1,
          presence_penalty: 0,
          frequency_penalty: 0,
          n: 1,
          model: this.model_name,
          max_tokens: this.max_output_tokens
        };
      }
      async request_middlewares(opts) {
        return opts;
      }
      /**
       * Completes the chat interaction by processing the provided options, making an API request, and handling the response.
       * This method supports both streaming and non-streaming responses, and can handle tool calls if specified in the response.
       *
       * @param {Object} opts - The options for the chat completion which may include settings like temperature, max tokens, etc.
       * @param {boolean} render - Flag to determine if the response should be rendered in the UI.
       * @returns {Promise<string|void>} - Returns the chat response content or handles tool outputs recursively. In case of errors, it may return an error message.
       */
      async complete(opts = {}, render = true) {
        var _a, _b, _c, _d;
        if (!this.base_model_config) {
          this.base_model_config = await this.get_base_model_config();
          this.config = {
            ...this.base_model_config,
            ...this.config
          };
        }
        opts = {
          ...this.default_opts,
          messages: ((_b = await ((_a = this.current) == null ? void 0 : _a.get_chat_ml())) == null ? void 0 : _b.messages) || [],
          ...opts
        };
        if (opts.stream !== false && this.config.streaming && !this.current.tool_choice)
          opts.stream = true;
        else
          opts.stream = false;
        opts = await this.request_middlewares(JSON.parse(JSON.stringify(opts)));
        const req = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.api_key}`
          },
          method: "POST"
        };
        if (this.config.headers)
          req.headers = { ...req.headers, ...this.config.headers };
        if (this.config.api_key_header) {
          if (this.config.api_key_header !== "none")
            req.headers[this.config.api_key_header] = this.api_key;
          delete req.headers.Authorization;
        }
        const body = typeof ((_c = this.env.actions) == null ? void 0 : _c.prepare_request_body) === "function" ? this.env.actions.prepare_request_body(opts) : { ...opts };
        req.body = JSON.stringify(typeof ((_d = this.adapter) == null ? void 0 : _d.prepare_request_body) === "function" ? this.adapter.prepare_request_body(body) : body);
        console.log(req);
        try {
          if (opts.stream)
            return await this.stream(req);
          const resp_json = await this.request(req);
          if (resp_json.error) {
            console.error(resp_json.error);
            if (render)
              this.done_handler("*API Error. See console logs for details.*");
            return;
          }
          const tool_call = this.get_tool_call(resp_json);
          if (tool_call) {
            this.env.chats.current.tool_choice = null;
            const tool_name = this.get_tool_name(tool_call);
            const tool_call_content = this.get_tool_call_content(tool_call);
            const tool = body.tools.find((t) => t.function.name === tool_name);
            if (is_valid_tool_call(tool, tool_call_content)) {
              await this.current.add_message({ role: "assistant", tool_calls: [{
                function: {
                  name: tool_name,
                  arguments: JSON.stringify(tool_call_content)
                }
              }] });
              const tool_handler = this.get_tool_handler(tool_name);
              if (!tool_handler)
                return console.error(`Tool ${tool_name} not found`);
              const tool_output = await tool_handler(this.env, tool_call_content);
              if (tool_output) {
                await this.current.add_tool_output(tool_name, tool_output);
                return this.complete({});
              }
            } else {
              console.error(`Invalid tool call: ${tool_call}`);
              if (render)
                this.done_handler("*Invalid tool call. See console logs for details.*");
              return "*Invalid tool call. See console logs for details.*";
            }
          }
          if (render)
            this.done_handler(this.get_message_content(resp_json));
          return this.get_message_content(resp_json);
        } catch (err) {
          console.error(err);
        }
      }
      // HANDLE TOOLS
      /**
       * Retrieves the tool handler function based on the tool name from the environment's actions.
       * This method can be overridden to use custom logic for handling tools.
       * 
       * @param {string} tool_name - The name of the tool for which the handler is to be retrieved.
       * @returns {Function} The handler function for the specified tool.
       */
      get_tool_handler(tool_name) {
        return this.env.actions.actions[tool_name].handler;
      }
      /**
       * Extracts the tool call information from a JSON response. This method supports adapter-specific logic.
       * If no adapter method is provided, it defaults to the expected OpenAI JSON format.
       * 
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object} The first tool call found in the response.
       */
      get_tool_call(json) {
        var _a, _b, _c;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_tool_call) === "function")
          return this.adapter.get_tool_call(json);
        return (_c = (_b = json.choices) == null ? void 0 : _b[0].message.tool_calls) == null ? void 0 : _c[0];
      }
      /**
       * Determines the tool name from a tool call object. Supports adapter-specific implementations.
       * Defaults to extracting the name directly from the tool call structure.
       * 
       * @param {Object} tool_call - The tool call object from which to extract the tool name.
       * @returns {string} The name of the tool.
       */
      get_tool_name(tool_call) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_tool_name) === "function")
          return this.adapter.get_tool_name(tool_call);
        return tool_call.function.name;
      }
      /**
       * Extracts the tool call content from a tool call object. Supports adapter-specific logic.
       * Defaults to parsing the 'arguments' field of the tool call function as JSON.
       * 
       * @param {Object} tool_call - The tool call object from which to extract the content.
       * @returns {Object} The parsed arguments of the tool call.
       */
      get_tool_call_content(tool_call) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_tool_call_content) === "function")
          return this.adapter.get_tool_call_content(tool_call);
        return JSON.parse(tool_call.function.arguments);
      }
      // HANDLE MESSAGES
      /**
       * Retrieves the message object from a JSON response. Supports adapter-specific implementations.
       * Defaults to handling both OpenAI and Ollama formats by checking for message structures in 'choices'.
       * 
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object} The message object extracted from the response.
       */
      get_message(json) {
        var _a, _b;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_message) === "function")
          return this.adapter.get_message(json);
        return ((_b = json.choices) == null ? void 0 : _b[0].message) || json.message;
      }
      /**
       * Extracts the content of a message from a JSON response. Supports adapter-specific implementations.
       * This method relies on `get_message` to first retrieve the message object.
       * 
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string} The content of the message.
       */
      get_message_content(json) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_message_content) === "function")
          return this.adapter.get_message_content(json);
        return this.get_message(json).content;
      }
      async request(req) {
        req.url = this.endpoint;
        req.throw = false;
        const resp = this._request_adapter ? await this._request_adapter(req) : await fetch(this.endpoint, req);
        console.log(resp);
        const resp_json = await this.get_resp_json(resp);
        console.log(resp_json);
        return resp_json;
      }
      async get_resp_json(resp) {
        return typeof resp.json === "function" ? await resp.json() : await resp.json;
      }
      get request_adapter() {
        return this._request_adapter;
      }
      async stream(req) {
        console.log("Streaming Request: ");
        console.log(req);
        const full_text = await new Promise((resolve, reject) => {
          try {
            this.active_stream = new SmartStreamer(this.endpoint_streaming, req);
            let curr_text = "";
            this.active_stream.addEventListener("message", (e) => {
              if (this.is_end_of_stream(e)) {
                this.stop_stream();
                return resolve(curr_text);
              }
              let text_chunk = this.get_text_chunk_from_stream(e);
              if (!text_chunk)
                return;
              curr_text += text_chunk;
              this.chunk_handler(text_chunk);
            });
            this.active_stream.addEventListener("readystatechange", (e) => {
              if (e.readyState >= 2)
                console.log("ReadyState: " + e.readyState);
            });
            this.active_stream.addEventListener("error", (e) => {
              console.error(e);
              this.done_handler("*API Error. See console logs for details.*");
              this.stop_stream();
              reject(e);
            });
            this.active_stream.stream();
          } catch (err) {
            console.error(err);
            this.stop_stream();
            reject(err);
          }
        });
        this.done_handler(full_text);
        return full_text;
      }
      get_text_chunk_from_stream(event) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.get_text_chunk_from_stream) === "function")
          return this.adapter.get_text_chunk_from_stream(event);
        let resp = null;
        let text_chunk = "";
        try {
          resp = JSON.parse(event.data);
          text_chunk = resp.choices[0].delta.content;
        } catch (err) {
          console.log(err);
          console.log(event.data);
          if (event.data.indexOf("}{") > -1)
            event.data = event.data.replace(/}{/g, "},{");
          resp = JSON.parse(`[${event.data}]`);
          resp.forEach((r) => {
            if (r.choices)
              text_chunk += r.choices[0].delta.content;
          });
        }
        return text_chunk;
      }
      is_end_of_stream(event) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.is_end_of_stream) === "function")
          return this.adapter.is_end_of_stream(event);
        return event.data === "[DONE]";
      }
      stop_stream() {
        if (this.active_stream) {
          this.active_stream.end();
          this.active_stream = null;
        }
      }
      done_handler(full_str) {
        if (typeof this.main.done_handler === "function")
          this.main.done_handler(full_str);
      }
      chunk_handler(text_chunk) {
        if (typeof this.main.chunk_handler === "function")
          this.main.chunk_handler(text_chunk);
      }
      async count_tokens(input) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.count_tokens) === "function")
          return await this.adapter.count_tokens(input);
        return this.estimate_tokens(input);
      }
      estimate_tokens(input) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.estimate_tokens) === "function")
          return this.adapter.estimate_tokens(input);
        if (typeof input === "object")
          input = JSON.stringify(input);
        return input.length / 4;
      }
      async test_api_key() {
        console.log(this.api_key);
        try {
          const request2 = {
            messages: [
              { role: "user", content: "Hello" }
            ],
            temperature: 0,
            max_tokens: 100,
            stream: false,
            n: 1
          };
          if (this.config.fetch_models) {
            request2.model = this.config.default_model;
          }
          const resp = await this.complete(request2, false);
          console.log(resp);
          if (!resp)
            return false;
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
      async get_models() {
        var _a;
        if (((_a = this.platforms[this.platform_key]) == null ? void 0 : _a.fetch_models) && typeof fetch_models[this.platform_key] === "function") {
          const models = await fetch_models[this.platform_key](this.api_key);
          if (models) {
            models.sort((a, b) => a.model_name.localeCompare(b.model_name));
            return models;
          } else
            console.error(`No models found for ${this.platform_key}`, models);
        }
        return [];
      }
      async get_base_model_config() {
        const models = await this.get_models();
        return models.find((m) => m.key === this.model_name);
      }
      // getters
      get api_key() {
        return this.config.api_key;
      }
      get current() {
        var _a;
        return (_a = this.env.chats) == null ? void 0 : _a.current;
      }
      // use endpoint of combine protocol, hostname, port, and path
      get endpoint() {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.endpoint) !== "undefined")
          return this.adapter.endpoint.replace("MODEL_NAME", this.model_name);
        return this.config.endpoint || this.config.protocol + "://" + this.config.hostname + (this.config.port ? ":" + this.config.port : "") + this.endpoint_path;
      }
      get endpoint_streaming() {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.endpoint_streaming) !== "undefined")
          return this.adapter.endpoint_streaming.replace("MODEL_NAME", this.model_name);
        return this.config.endpoint_streaming || this.endpoint;
      }
      get endpoint_path() {
        return this.config.path.startsWith("/") ? this.config.path : "/" + this.config.path;
      }
      get max_input_tokens() {
        return this.config.max_input_tokens;
      }
      get max_output_tokens() {
        return this.config.max_output_tokens;
      }
      get model_name() {
        return this.config.model_name || this.config.default_model;
      }
      get multimodal() {
        var _a;
        return typeof ((_a = this.adapter) == null ? void 0 : _a.multimodal) !== "undefined" ? this.adapter.multimodal : this.config.multimodal;
      }
    };
    exports2.SmartChatModel = SmartChatModel;
  }
});

// src/sc_chat_model.js
var require_sc_chat_model = __commonJS({
  "src/sc_chat_model.js"(exports2) {
    var ScTranslations = require_ScTranslations();
    var { SmartChatModel } = require_smart_chat_model();
    var ScChatModel = class extends SmartChatModel {
      async done_handler(full_str) {
        await this.env.chat_ui.new_message(full_str, "assistant");
        this.env.chats.current.add_message({ role: "assistant", content: full_str });
        this.env.chat_ui.clear_streaming_ux();
      }
      async chunk_handler(text_chunk) {
        await this.env.chat_ui.new_message(text_chunk, "assistant", true);
      }
      async request_middlewares(opts) {
        await Promise.all(opts.messages.map(async (msg, i) => {
          const context_start = "```sc-context";
          if (msg.role === "tool" && msg.tool_call_id === "lookup") {
            msg.role = "system";
            msg.content = context_start + "\n" + JSON.parse(msg.content).map((c) => c.path).join("\n") + "\n```";
          }
          if (msg.role === "system" && msg.content.includes(context_start)) {
            const context_start_i = msg.content.indexOf(context_start) + context_start.length;
            const context_end_i = msg.content.substring(context_start_i).indexOf("```");
            const raw_contents = msg.content.substring(context_start_i, context_start_i + context_end_i);
            const entities = this.env.plugin.get_entities_from_context_codeblock(raw_contents);
            let context = [];
            let tokens = [];
            await Promise.all(entities.map(async (entity, i2) => {
              if (!(entity == null ? void 0 : entity.get_as_context))
                return console.log(entity);
              context[i2] = await entity.get_as_context({ i: i2 });
              tokens[i2] = await this.count_tokens(context[i2]);
            }));
            let total_tokens = 0;
            let ct = 0;
            context = context.reduce((acc, c, i2) => {
              if (!c)
                return acc;
              if (total_tokens + tokens[i2] > this.max_input_tokens)
                return acc;
              total_tokens += tokens[i2];
              ct++;
              if (acc)
                acc += "\n";
              return acc + c;
            }, "");
            msg.content = this.get_prompt_context_prefix({ ct }) + "\n" + context;
          }
          const sys_start = "```sc-system";
          if (msg.role === "system" && msg.content.includes(sys_start)) {
            const sys_start_i = msg.content.indexOf(sys_start) + sys_start.length;
            const sys_end_i = msg.content.substring(sys_start_i).indexOf("```");
            const sys_prompts = msg.content.substring(sys_start_i, sys_start_i + sys_end_i).split("\n").filter((ln) => ln.trim());
            console.log(sys_prompts);
            msg.content = "";
            for (const sys_prompt of sys_prompts) {
              const tfile = this.env.system_prompts.find((file) => file.basename === sys_prompt);
              const note_content = await this.env.plugin.brain.cached_read(tfile);
              if (msg.content)
                msg.content += "\n";
              msg.content += note_content;
            }
          }
          return msg;
        }));
        opts.messages = opts.messages.filter((msg) => {
          var _a;
          return msg.role !== "assistant" || msg.content || !((_a = msg.tool_calls) == null ? void 0 : _a.find((call) => call.id === "lookup"));
        });
        console.log(opts.messages);
        return opts;
      }
      get_prompt_context_prefix(params = {}) {
        return `Anticipate the type of answer desired by the user. Imagine the following${params.ct ? " " + params.ct : ""} notes were written by the user and contain all the necessary information to answer the user's question. Begin responses with "${ScTranslations[this.env.plugin.settings.language].prompt}..."`;
      }
    };
    exports2.ScChatModel = ScChatModel;
  }
});

// node_modules/smart-chats/utils/message_content_array_to_markdown.js
var require_message_content_array_to_markdown = __commonJS({
  "node_modules/smart-chats/utils/message_content_array_to_markdown.js"(exports2) {
    function message_content_array_to_markdown(content) {
      let markdown = "";
      content.forEach((c, i) => {
        var _a;
        if (c.type === "text") {
          if (c.text.startsWith("Image caption: ")) {
            if (((_a = content[i - 1]) == null ? void 0 : _a.type) === "image_url") {
              markdown = markdown.split("\n").slice(0, -2).join("\n");
              markdown += `
![${c.text.split(":")[1].trim()}](${content[i - 1].image_url.url})`;
            } else {
              markdown += `${c.text}`;
            }
          } else {
            markdown += `${c.text}`;
          }
        } else if (c.type === "image_url")
          markdown += `![](${c.image_url.url})`;
        markdown += "\n";
      });
      return markdown.trim();
    }
    exports2.message_content_array_to_markdown = message_content_array_to_markdown;
  }
});

// node_modules/smart-chats/smart_chats_ui.js
var require_smart_chats_ui = __commonJS({
  "node_modules/smart-chats/smart_chats_ui.js"(exports2) {
    var { message_content_array_to_markdown } = require_message_content_array_to_markdown();
    var SmartChatsUI = class {
      /**
       * Creates an instance of SmartChatsUI.
       * @param {Object} env - The environment object containing configurations and utilities.
       * @param {HTMLElement} container - The HTML container element for the chat UI.
       */
      constructor(env, container) {
        this.env = env;
        this.main = this.env;
        this.container = container;
        this.templates = this.env.templates;
      }
      /**
       * Provides a context for the view rendering. Should be overridden in subclasses.
       * @returns {Object} The context object for the view.
       */
      get view_context() {
        return {
          /* override */
        };
      }
      /**
       * Renders templates using the environment's rendering engine.
       * @param {...any} args - Arguments including template and data to render.
       * @returns {Promise<string>} The rendered HTML string.
       */
      async render(...args) {
        return await this.env.ejs.render(...args);
      }
      /**
       * Displays a notice message in the console.
       * @param {string} message - The message to display.
       */
      show_notice(message) {
        console.log(message);
      }
      /**
       * Initializes the chat UI by clearing the container and rendering the initial chat template.
       */
      async init() {
        console.log("init SmartChatRenderer");
        console.log(this.container);
        this.container.innerHTML = "";
        console.log(this.env.chats.current);
        const data = await this.get_view_data();
        this.container.innerHTML = await this.render(this.templates.smart_chat, data, { context: this.view_context, rmWhitespace: true });
        this.post_process();
      }
      /**
       * Handles new user messages, updates the UI, and triggers rendering of typing indicator.
       * @param {string} user_input - The user's input message.
       */
      async new_user_message(user_input) {
        await this.new_message(user_input, "user");
        this.set_streaming_ux();
        await this.render_dotdotdot();
      }
      /**
       * Post-initialization processing, such as adding listeners and processing messages.
       */
      async post_process() {
        this.add_listeners();
        this.messages.forEach(this.message_post_process.bind(this));
      }
      /**
       * Placeholder for adding listeners. Should be overridden in subclasses.
       */
      add_listeners() {
      }
      /**
       * Placeholder for message post-processing. Should be overridden in subclasses.
       * @param {HTMLElement} msg_elm - The message element to process.
       */
      message_post_process(msg_elm) {
      }
      /**
       * Retrieves view data for rendering the chat interface.
       * @returns {Promise<Object>} An object containing data for the view.
       */
      add_message_listeners(msg_elm) {
      }
      // OVERRIDE
      async get_view_data() {
        var _a;
        const data = {
          name: ((_a = this.env.chats.current) == null ? void 0 : _a.name) || "UNTITLED CHAT",
          messages: await this.env.chats.current.get_messages_html()
        };
        return data;
      }
      /**
       * Adds input listeners to the chat form for handling special keys and sending messages.
       */
      add_chat_input_listeners() {
        const chat_input = this.container.querySelector(".sc-chat-form");
        const textarea = chat_input.querySelector("textarea");
        chat_input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            if (this.prevent_input) {
              this.show_notice("Wait until current response is finished.");
              return;
            }
            let user_input = textarea.value;
            textarea.value = "";
            this.env.chats.current.new_user_message(user_input);
          }
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
        });
        const abort_button = this.container.querySelector("#sc-abort-button");
        abort_button.addEventListener("click", () => {
          this.env.chat_model.stop_stream();
          this.clear_streaming_ux();
        });
        const button = this.container.querySelector("#sc-send-button");
        button.addEventListener("click", () => {
          if (this.prevent_input) {
            this.show_notice("Wait until current response is finished.");
            return;
          }
          let user_input = textarea.value;
          textarea.value = "";
          this.env.chats.current.new_user_message(user_input);
        });
      }
      // render message
      async new_message(content, role = "assistant", append_last = false) {
        if (this.dotdotdot_interval) {
          if (!this.last_msg)
            this.message_container.insertAdjacentHTML("beforeend", await this.get_message_html(role, content));
          clearInterval(this.dotdotdot_interval);
          this.dotdotdot_interval = null;
          this.last_msg_content.innerHTML = "";
          this.last_msg.dataset.content = "";
        }
        if (this.last_msg && !this.last_msg.dataset.content)
          this.last_msg.dataset.content = "";
        if (append_last) {
          this.last_msg_content.innerHTML += content;
          this.last_msg.dataset.content += content;
          if (content.indexOf("\n") > -1)
            this.render_md_as_html(this.last_msg);
        } else {
          if (this.last_from !== role) {
            const html = await this.get_message_html(role, content);
            this.message_container.insertAdjacentHTML("beforeend", html);
            this.last_from = role;
            this.last_msg.dataset.content = content;
          } else {
            this.last_msg_content.innerHTML = content;
            this.last_msg.dataset.content = content;
          }
          this.message_post_process(this.last_msg);
        }
        this.message_container.scrollTop = this.message_container.scrollHeight;
      }
      /**
       * Generates HTML for a message based on the role and content.
       * @param {string} role - The role of the message sender.
       * @param {string} content - The content of the message.
       * @returns {Promise<string>} The HTML string for the message.
       */
      async get_message_html(role, content) {
        if (Array.isArray(content))
          content = message_content_array_to_markdown(content);
        return await this.render(this.templates.smart_chat_msg, { role, content }, { context: this.view_context, rmWhitespace: true });
      }
      async get_system_message_html(msg) {
        let { content, role } = msg;
        if (content.includes("```sc-system")) {
          content = content.replace(/```sc-system|```/g, "").trim();
          content = "system prompts: " + content.split("\n").filter((ln) => ln.trim()).join(", ");
        }
        if (content.includes("```sc-context")) {
          content = content.replace(/```sc-context|```/g, "").trim();
          content = "context: " + content.split("\n").filter((ln) => ln.trim()).join(", ");
          if (content.length > 100)
            content = content.substring(0, 100) + "...";
        }
        return await this.render(this.templates.smart_chat_system_msg, { content, role }, { context: this.view_context, rmWhitespace: true });
      }
      /**
       * Inserts selected text from a suggestion modal into the chat input.
       * @param {string} insert_text - The text to insert.
       */
      insert_selection(insert_text) {
        const textarea = this.container.querySelector(".sc-chat-form textarea");
        let caret_pos = textarea.selectionStart;
        let text_before = textarea.value.substring(0, caret_pos);
        let text_after = textarea.value.substring(caret_pos, textarea.value.length);
        textarea.value = text_before + insert_text + text_after;
        textarea.selectionStart = caret_pos + insert_text.length;
        textarea.selectionEnd = caret_pos + insert_text.length;
        textarea.focus();
      }
      /**
       * Renders a typing indicator ("...") and sets an interval to animate it.
       */
      async render_dotdotdot() {
        if (this.dotdotdot_interval)
          clearInterval(this.dotdotdot_interval);
        await this.new_message("...", "assistant");
        let dots = 0;
        const curr_msg = this.last_msg_content;
        curr_msg.innerHTML = "...";
        this.dotdotdot_interval = setInterval(() => {
          dots++;
          if (dots > 3)
            dots = 1;
          curr_msg.innerHTML = ".".repeat(dots);
        }, 500);
      }
      /**
       * Returns the message container element.
       * @returns {HTMLElement} The message container.
       */
      get message_container() {
        return this.container.querySelector(".sc-message-container");
      }
      /**
       * Returns the last message content element.
       * @returns {HTMLElement} The last message content element.
       */
      get last_msg() {
        return this.container.querySelector(".sc-message-container").lastElementChild.querySelector(".sc-message-content");
      }
      /**
       * Returns the last message content span element.
       * @returns {HTMLElement} The last message content span element.
       */
      get last_msg_content() {
        return this.last_msg.querySelector("span:not(.sc-msg-button)");
      }
      /**
       * Returns all message content elements.
       * @returns {NodeListOf<HTMLElement>} A NodeList of message content elements.
       */
      get messages() {
        return this.container.querySelectorAll(".sc-message-container .sc-message-content");
      }
      /**
       * Sets the user interface to a "streaming" mode, disabling input and showing an abort button.
       */
      set_streaming_ux() {
        this.prevent_input = true;
        if (this.container.querySelector("#sc-send-button"))
          this.container.querySelector("#sc-send-button").style.display = "none";
        if (this.container.querySelector("#sc-abort-button"))
          this.container.querySelector("#sc-abort-button").style.display = "block";
      }
      /**
       * Resets the user interface from "streaming" mode to normal.
       */
      unset_streaming_ux() {
        this.prevent_input = false;
        if (this.container.querySelector("#sc-send-button"))
          this.container.querySelector("#sc-send-button").style.display = "";
        if (this.container.querySelector("#sc-abort-button"))
          this.container.querySelector("#sc-abort-button").style.display = "none";
      }
      /**
       * Clears any streaming user interface effects, such as intervals and temporary elements.
       */
      clear_streaming_ux() {
        this.unset_streaming_ux();
        if (this.dotdotdot_interval) {
          clearInterval(this.dotdotdot_interval);
          this.dotdotdot_interval = null;
          if ([".", "..", "..."].includes(this.last_msg_content.innerHTML.trim())) {
            this.last_msg.parentElement.remove();
          }
        }
      }
      /**
       * Update/set text in chat_input
       */
      set_chat_input_text(text) {
        const textarea = this.container.querySelector(".sc-chat-form textarea");
        textarea.value = text;
      }
      undo_last_message() {
        if (this.dotdotdot_interval)
          this.clear_streaming_ux();
        this.last_msg.parentElement.remove();
        this.env.chats.current.remove_last_message();
      }
    };
    exports2.SmartChatsUI = SmartChatsUI;
  }
});

// src/smart_obsidian_view.js
var require_smart_obsidian_view = __commonJS({
  "src/smart_obsidian_view.js"(exports2) {
    var { ItemView } = require("obsidian");
    var views = require_views();
    var ejs = require_ejs_min();
    var SmartObsidianView = class extends ItemView {
      constructor(leaf, plugin) {
        super(leaf);
        this.app = plugin.app;
        this.plugin = plugin;
        this.settings = plugin.settings;
        this.templates = views;
        this.ejs = ejs;
      }
      get env() {
        return this.plugin.env;
      }
      get config() {
        return this.plugin.settings;
      }
      render_template(template_name, data) {
        if (!this.templates[template_name])
          throw new Error(`Template '${template_name}' not found.`);
        return ejs.render(this.templates[template_name], data, { context: this.view_context });
      }
      get view_context() {
        return {
          // app: this.plugin.app,
          attribution: this.templates.attribution,
          get_icon: this.get_icon.bind(this),
          settings: this.plugin.settings
        };
      }
      async wait_for_env_to_load() {
        var _a, _b;
        if (!((_a = this.env) == null ? void 0 : _a.entities_loaded)) {
          this.containerEl.children[1].innerHTML = "Loading Smart Connections...";
          while (!((_b = this.env) == null ? void 0 : _b.entities_loaded)) {
            await new Promise((r) => setTimeout(r, 2e3));
          }
        }
      }
      get_icon(name) {
        return this.plugin.obsidian.getIcon(name).outerHTML;
      }
      static get view_type() {
      }
      static get_leaf(workspace) {
        var _a;
        return (_a = workspace.getLeavesOfType(this.view_type)) == null ? void 0 : _a.find((leaf) => leaf.view instanceof this);
      }
      static get_view(workspace) {
        var _a;
        return (_a = this.get_leaf(workspace)) == null ? void 0 : _a.view;
      }
      static open(workspace, active = true) {
        if (this.get_leaf(workspace))
          this.get_leaf(workspace).setViewState({ type: this.view_type, active });
        else
          workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
        if (workspace.rightSplit.collapsed)
          workspace.rightSplit.toggle();
      }
      static is_open(workspace) {
        var _a;
        return ((_a = this.get_leaf(workspace)) == null ? void 0 : _a.view) instanceof this;
      }
    };
    exports2.SmartObsidianView = SmartObsidianView;
  }
});

// src/sc_chat_view.js
var require_sc_chat_view = __commonJS({
  "src/sc_chat_view.js"(exports2) {
    var { SmartObsidianView } = require_smart_obsidian_view();
    var ScChatView2 = class extends SmartObsidianView {
      static get view_type() {
        return "smart-connections-chat-view";
      }
      getDisplayText() {
        return "Smart Connections Chat";
      }
      getIcon() {
        return "message-square";
      }
      getViewType() {
        return ScChatView2.view_type;
      }
      async onOpen() {
        this.app.workspace.onLayoutReady(this.initialize.bind(this));
      }
      async initialize() {
        await this.wait_for_env_to_load();
        if (this.env.chat_ui)
          this.env.chat_ui.container = this.containerEl;
        while (!this.env.chats)
          await new Promise((r) => setTimeout(r, 300));
        await this.env.chats.new();
        this.app.workspace.registerHoverLinkSource(ScChatView2.view_type, {
          display: "Smart Chat Links",
          defaultMod: true
        });
      }
      onClose() {
        this.app.workspace.unregisterHoverLinkSource(ScChatView2.view_type);
      }
    };
    exports2.ScChatView = ScChatView2;
  }
});

// src/smart_settings.js
var require_smart_settings = __commonJS({
  "src/smart_settings.js"(exports2) {
    var { Setting } = require("obsidian");
    var SmartSettings = class {
      constructor(env, container, template_name = "smart_settings") {
        this.env = env;
        this.plugin = this.env.plugin;
        this.settings = this.plugin.settings;
        this.container = container;
        this.template_name = template_name;
        this.ejs = this.env.ejs;
        this.templates = this.env.templates;
      }
      async render() {
        const view_data = typeof this.get_view_data === "function" ? await this.get_view_data() : this.view_data;
        this.render_template(view_data);
        this.render_components();
      }
      render_template(view_data = null) {
        if (!this.template)
          throw new Error(`Settings template not found.`);
        this.container.empty();
        this.container.innerHTML = this.ejs.render(this.template, view_data || this.view_data, { context: this });
      }
      async update(setting, value) {
        console.log("saving setting: " + setting);
        if (setting.includes(".")) {
          let parts = setting.split(".");
          let obj = this.plugin.settings;
          for (let i = 0; i < parts.length - 1; i++) {
            if (!obj[parts[i]])
              obj[parts[i]] = {};
            obj = obj[parts[i]];
          }
          obj[parts[parts.length - 1]] = typeof value === "string" ? value.trim() : value;
        } else {
          this.plugin.settings[setting] = typeof value === "string" ? value.trim() : value;
        }
        await this.plugin.save_settings(true);
        console.log("saved settings");
        console.log(this.plugin.settings);
      }
      render_components() {
        this.container.querySelectorAll(".setting-component").forEach((elm) => {
          const setting_elm = new Setting(elm);
          if (elm.dataset.name)
            setting_elm.setName(elm.dataset.name);
          if (elm.dataset.description)
            setting_elm.descEl.innerHTML = elm.dataset.description;
          const setting = elm.dataset.setting;
          if (elm.dataset.type === "text") {
            setting_elm.addText((text) => {
              text.setPlaceholder(elm.dataset.placeholder || "");
              text.setValue(this.get_setting(setting));
              let debounceTimer;
              if (elm.dataset.button) {
                setting_elm.addButton((button) => {
                  button.setButtonText(elm.dataset.button);
                  button.onClick(async () => this.handle_on_change(setting, text.getValue(), elm));
                });
              } else {
                text.onChange(async (value) => {
                  clearTimeout(debounceTimer);
                  debounceTimer = setTimeout(() => this.handle_on_change(setting, value, elm), 2e3);
                });
              }
            });
          } else if (elm.dataset.type === "number") {
            setting_elm.addText((number) => {
              number.inputEl.type = "number";
              number.setPlaceholder(elm.dataset.placeholder || "");
              number.inputEl.value = parseInt(this.get_setting(setting));
              number.inputEl.min = elm.dataset.min || 0;
              if (elm.dataset.max)
                number.inputEl.max = elm.dataset.max;
              let debounceTimer;
              number.onChange(async (value) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => this.handle_on_change(setting, parseInt(value), elm), 2e3);
              });
            });
          } else if (elm.dataset.type === "dropdown") {
            setting_elm.addDropdown((dropdown) => {
              Object.entries(elm.dataset).filter(([k, v]) => k.startsWith("option")).forEach(([k, v]) => {
                const [value, name] = v.split("|");
                dropdown.addOption(value, name || value);
              });
              dropdown.onChange(async (value) => this.handle_on_change(setting, value, elm));
              dropdown.setValue(this.get_setting(setting));
            });
          } else if (elm.dataset.type === "button") {
            setting_elm.addButton((button) => {
              button.setButtonText(elm.dataset.btnText || elm.dataset.name);
              button.onClick(async () => {
                if (elm.dataset.confirm) {
                  const confirmation_message = elm.dataset.confirm;
                  if (!confirm(confirmation_message))
                    return;
                }
                if (elm.dataset.href)
                  window.open(elm.dataset.href);
                if (elm.dataset.callback)
                  this[elm.dataset.callback](setting);
              });
            });
          } else if (elm.dataset.type === "toggle") {
            setting_elm.addToggle((toggle) => {
              toggle.setValue(this.get_setting(setting));
              toggle.onChange(async (value) => this.handle_on_change(setting, value, elm));
            });
          }
          if (elm.dataset.disabled)
            setting_elm.setDisabled(true);
        });
      }
      async handle_on_change(setting, value, elm) {
        await this.update(setting, value);
        if (elm.dataset.callback)
          this[elm.dataset.callback](setting, value, elm);
      }
      get_setting(setting) {
        if (setting.includes(".")) {
          let parts = setting.split(".");
          let obj = this.plugin.settings;
          for (let part of parts.slice(0, -1)) {
            if (obj[part] === void 0)
              return this.plugin.constructor.defaults[setting];
            obj = obj[part];
          }
          return obj[parts[parts.length - 1]] || this.plugin.constructor.defaults[setting];
        } else {
          return this.plugin.settings[setting] || this.plugin.constructor.defaults[setting];
        }
      }
      // override in subclass (required)
      get template() {
        return "";
      }
      // ejs template string
      get view_data() {
        return {};
      }
      // object properties available in template
    };
    exports2.SmartSettings = SmartSettings;
  }
});

// src/smart_chat_settings.js
var require_smart_chat_settings = __commonJS({
  "src/smart_chat_settings.js"(exports2) {
    var ScTranslations = require_ScTranslations();
    var { SmartSettings } = require_smart_settings();
    var SmartChatSettings = class extends SmartSettings {
      update_smart_chat_folder() {
        this.plugin.update_smart_chat_folder();
      }
      async changed_smart_chat_model(render = true) {
        console.log(this.plugin.settings.chat_model_platform_key);
        await this.plugin.save_settings(true);
        this.plugin.env.chat_model = null;
        this.plugin.env.init_chat_model(this.plugin.settings.chat_model_platform_key);
        const platform_config = this.plugin.env.chat_model.platforms[this.plugin.settings.chat_model_platform_key];
        let smart_chat_model_config = this.plugin.settings[this.plugin.settings.chat_model_platform_key] || {};
        if (smart_chat_model_config.model_name) {
          const platform_models = await this.plugin.env.chat_model.get_models();
          const model_config = platform_models.find((m) => m.model_name === smart_chat_model_config.model_name);
          smart_chat_model_config = {
            ...smart_chat_model_config || {},
            ...platform_config || {},
            ...model_config || {}
          };
          this.plugin.settings[this.plugin.settings.chat_model_platform_key] = smart_chat_model_config;
        }
        this.plugin.save_settings();
        if (render)
          this.render();
      }
      async test_chat_api_key() {
        await this.changed_smart_chat_model();
        const resp = await this.plugin.env.chat_model.test_api_key();
        if (resp)
          return this.plugin.notices.show("api key test pass", "Success! API key is valid");
        this.plugin.notices.show("api key test fail", "Error: API key is invalid!");
      }
      get self_ref_list() {
        return "Current: " + ScTranslations[this.config.language].pronouns.join(", ");
      }
      get template() {
        return this.templates["smart_chat_settings"];
      }
      async get_view_data() {
        var _a, _b, _c;
        const view_data = {
          settings: this.plugin.settings,
          chat_platform: (_a = this.env.chat_model) == null ? void 0 : _a.platforms[this.plugin.settings.chat_model_platform_key],
          chat_platforms: ((_b = this.env.chat_model) == null ? void 0 : _b.platforms) ? Object.keys(this.env.chat_model.platforms).map((platform_key) => {
            var _a2;
            return { key: platform_key, ...((_a2 = this.env.chat_model) == null ? void 0 : _a2.platforms[platform_key]) || {} };
          }) : []
        };
        view_data.platform_chat_models = await ((_c = this.plugin.env.chat_model) == null ? void 0 : _c.get_models());
        view_data.smart_chat_settings = this.ejs.render(this.template, view_data);
        return view_data;
      }
    };
    exports2.SmartChatSettings = SmartChatSettings;
  }
});

// src/sc_chats_ui.js
var require_sc_chats_ui = __commonJS({
  "src/sc_chats_ui.js"(exports2) {
    var { SmartChatsUI } = require_smart_chats_ui();
    var { ScChatView: ScChatView2 } = require_sc_chat_view();
    var { FuzzySuggestModal } = require("obsidian");
    var { SmartChatSettings } = require_smart_chat_settings();
    var ScChatsUI = class extends SmartChatsUI {
      get view_context() {
        return {
          attribution: this.templates.attribution,
          get_icon: this.env.plugin.chat_view.get_icon.bind(this.env.plugin.chat_view)
        };
      }
      get obsidian() {
        return this.env.plugin.obsidian;
      }
      show_notice(message) {
        this.env.plugin.show_notice(message);
      }
      add_listeners() {
        const chat_name_input = this.container.querySelector(".sc-chat-name-input");
        chat_name_input.addEventListener("change", (event) => {
          this.env.chats.current.rename(event.target.value);
        });
        const open_in_note_btn = this.container.querySelector("button[title='Open Conversation Note']");
        open_in_note_btn.addEventListener("click", () => {
          const link_path = this.env.chats.current.file_path;
          const link_tfile = this.env.plugin.app.metadataCache.getFirstLinkpathDest(link_path, "/");
          let leaf = this.env.plugin.app.workspace.getLeaf(true);
          leaf.openFile(link_tfile);
        });
        const settings_btn = this.container.querySelector("button[title='Settings']");
        settings_btn.addEventListener("click", async () => {
          const settings_container = this.container.querySelector("#settings");
          if (settings_container.innerHTML)
            return settings_container.innerHTML = "";
          if (!this.chat_settings)
            this.chat_settings = new SmartChatSettings(this.env, settings_container);
          else
            this.chat_settings.container = settings_container;
          this.chat_settings.render();
          settings_container.style.transition = "background-color 0.5s ease-in-out";
          settings_container.style.backgroundColor = "var(--bold-color)";
          setTimeout(() => {
            settings_container.style.backgroundColor = "";
          }, 500);
        });
        const history_btn = this.container.querySelector("button[title='Chat History']");
        history_btn.addEventListener("click", () => {
          this.env.chats.open_modal();
        });
        const new_chat_btn = this.container.querySelector("button[title='New Chat']");
        new_chat_btn.addEventListener("click", () => {
          this.env.chats.new();
        });
        this.add_chat_input_listeners();
      }
      async message_post_process(msg_elm) {
        await this.render_md_as_html(msg_elm);
        this.handle_links_in_message(msg_elm);
        this.add_message_listeners(msg_elm);
      }
      async render_md_as_html(msg_elm) {
        const text_elm = msg_elm.querySelector("span:not(.sc-msg-button)");
        const text = msg_elm.getAttribute("data-content") || text_elm.textContent;
        text_elm.innerHTML = "";
        await this.obsidian.MarkdownRenderer.render(this.env.plugin.app, text, text_elm, "?no-dataview", new this.obsidian.Component());
      }
      handle_links_in_message(msg_elm) {
        const links = msg_elm.querySelectorAll("a");
        if (links.length > 0) {
          for (let i = 0; i < links.length; i++) {
            const link = links[i];
            const link_text = link.getAttribute("data-href");
            link.addEventListener("mouseover", (event) => {
              this.env.plugin.app.workspace.trigger("hover-link", {
                event,
                source: ScChatView2.view_type,
                hoverParent: link.parentElement,
                targetEl: link,
                // extract link text from a.data-href
                linktext: link_text
              });
            });
            link.addEventListener("click", (event) => {
              const link_tfile = this.env.plugin.app.metadataCache.getFirstLinkpathDest(link_text, "/");
              const mod = this.obsidian.Keymap.isModEvent(event);
              let leaf = this.env.plugin.app.workspace.getLeaf(mod);
              leaf.openFile(link_tfile);
            });
          }
        }
      }
      add_message_listeners(msg_elm) {
        const copy_button = msg_elm.querySelector("span.sc-msg-button[title='Copy message to clipboard']");
        copy_button == null ? void 0 : copy_button.addEventListener("click", (e) => {
          console.log("copy message to clipboard");
          const msg_content_elm = e.target.closest(".sc-message-content");
          console.log(msg_content_elm);
          const msg_content = msg_content_elm.getAttribute("data-content") || msg_content_elm.querySelector("span:not(.sc-msg-button)").textContent;
          console.log(msg_content);
          navigator.clipboard.writeText(msg_content);
          this.env.plugin.show_notice("Message copied to clipboard");
        });
      }
      // open file suggestion modal
      open_file_suggestion_modal() {
        if (!this.file_selector)
          this.file_selector = new ScFileSelectModal(this.env.plugin.app, this.env);
        this.file_selector.open();
      }
      // open folder suggestion modal
      async open_folder_suggestion_modal() {
        if (!this.folder_selector) {
          const folders = await this.env.plugin.get_folders();
          this.folder_selector = new ScFolderSelectModal(this.env.plugin.app, this.env, folders);
        }
        this.folder_selector.open();
      }
      async open_system_prompt_modal() {
        if (!this.system_prompt_selector)
          this.system_prompt_selector = new ScSystemPromptSelectModal(this.env.plugin.app, this.env);
        this.system_prompt_selector.open();
      }
      add_chat_input_listeners() {
        super.add_chat_input_listeners();
        const chat_input = this.container.querySelector(".sc-chat-form");
        this.brackets_ct = 0;
        this.prevent_input = false;
        chat_input.addEventListener("keyup", this.key_up_handler.bind(this));
      }
      key_up_handler(e) {
        const textarea = this.container.querySelector(".sc-chat-form textarea");
        if (!["/", "@", "["].includes(e.key))
          return;
        const caret_pos = textarea.selectionStart;
        if (e.key === "[") {
          if (textarea.value[caret_pos - 2] === "[") {
            this.open_file_suggestion_modal();
            return;
          }
        } else {
          this.brackets_ct = 0;
        }
        if (e.key === "/") {
          if (textarea.value.length === 1 || textarea.value[caret_pos - 2] === " ") {
            this.open_folder_suggestion_modal();
            return;
          }
        }
        if (e.key === "@") {
          if (textarea.value.length === 1 || textarea.value[caret_pos - 2] === " ") {
            this.open_system_prompt_modal();
            return;
          }
        }
      }
    };
    exports2.ScChatsUI = ScChatsUI;
    var ScFileSelectModal = class extends FuzzySuggestModal {
      constructor(app, env) {
        super(app);
        this.app = app;
        this.env = env;
        this.setPlaceholder("Type the name of a file...");
      }
      // get all markdown files
      getItems() {
        return this.app.vault.getMarkdownFiles().sort((a, b) => a.basename.localeCompare(b.basename));
      }
      getItemText(item) {
        return item.basename;
      }
      onChooseItem(file) {
        this.env.chat_ui.insert_selection(file.basename + "]] ");
      }
    };
    var ScFolderSelectModal = class extends FuzzySuggestModal {
      constructor(app, env, folders) {
        super(app);
        this.app = app;
        this.env = env;
        this.folders = folders;
        this.setPlaceholder("Type the name of a folder...");
      }
      getItems() {
        return this.folders;
      }
      getItemText(item) {
        return item;
      }
      onChooseItem(folder) {
        this.env.chat_ui.insert_selection(folder + "/ ");
      }
    };
    var ScSystemPromptSelectModal = class extends FuzzySuggestModal {
      constructor(app, env) {
        super(app);
        this.app = app;
        this.env = env;
        this.setPlaceholder("Type the name of a system prompt...");
      }
      // getItems() { return this.env.system_prompts; }
      getItems() {
        return this.env.system_prompts;
      }
      getItemText(item) {
        return item.basename;
      }
      onChooseItem(prompt) {
        this.env.chat_ui.insert_selection('"' + prompt.basename + '"');
      }
    };
  }
});

// node_modules/smart-chats/utils/chat_ml_to_markdown.js
var require_chat_ml_to_markdown = __commonJS({
  "node_modules/smart-chats/utils/chat_ml_to_markdown.js"(exports2) {
    var { message_content_array_to_markdown } = require_message_content_array_to_markdown();
    function chat_ml_to_markdown(chat_ml) {
      console.log("chat_ml");
      console.log(chat_ml);
      let markdown = "";
      let has_md = false;
      chat_ml.messages.forEach((msg) => {
        if (msg.role && msg.content) {
          if (markdown.length > 0)
            markdown += "\n\n";
          markdown += `##### ${msg.role}
`;
          if (msg.role === "tool") {
            console.log(msg);
            markdown += "```";
            if (msg.tool_call_id)
              markdown += `${msg.tool_call_id}
`;
            if (msg.content)
              markdown += `${msg.content}
`;
            markdown += "```";
          } else if (Array.isArray(msg.content)) {
            markdown += message_content_array_to_markdown(msg.content);
          } else if (msg.content.indexOf("---BEGIN NOTE") > -1) {
            markdown += "```sc-context";
            const lines = msg.content.split("\n").filter((line) => line.trim().length && line.startsWith("---BEGIN NOTE") && line.indexOf("[[") > -1);
            lines.forEach((line, i) => {
              const link = line.substring(line.indexOf("[[") + 2, line.indexOf("]]"));
              if (i > 0)
                markdown += "\n";
              if (link)
                markdown += `${link}`;
            });
            markdown += "\n```";
          } else if (msg.content.indexOf("#") === 0 || msg.content.indexOf("\n#") > -1) {
            markdown += "```md";
            const content = msg.content.replace(/\n[`]{3}/g, "\n\\```");
            markdown += `
${content}`;
            markdown += "\n```";
          } else
            markdown += `${msg.content}`;
        }
        if (msg.tool_calls) {
          msg.tool_calls.forEach((tool_call) => {
            var _a, _b, _c;
            if (markdown.length > 0)
              markdown += "\n\n";
            markdown += `##### assistant
`;
            markdown += `\`\`\`${(_a = tool_call == null ? void 0 : tool_call.function) == null ? void 0 : _a.name}`;
            try {
              markdown += `
${JSON.stringify(JSON.parse((_b = tool_call == null ? void 0 : tool_call.function) == null ? void 0 : _b.arguments))}`;
            } catch (err) {
              markdown += `
${(_c = tool_call == null ? void 0 : tool_call.function) == null ? void 0 : _c.arguments}`;
            }
            markdown += "\n```";
          });
        }
      });
      return markdown.trim();
    }
    exports2.chat_ml_to_markdown = chat_ml_to_markdown;
  }
});

// node_modules/smart-chats/utils/add_content_to_message.js
var require_add_content_to_message = __commonJS({
  "node_modules/smart-chats/utils/add_content_to_message.js"(exports2) {
    function add_content_to_message(curr_msg, content) {
      if (typeof content === "string")
        content = content.trim();
      else
        content = content.map((c) => c.type === "text" ? { type: "text", text: c.text.trim() } : c);
      if (Array.isArray(content)) {
        if (typeof curr_msg.content === "string")
          curr_msg.content = [{ type: "text", text: curr_msg.content }];
        else if (typeof curr_msg.content === "undefined")
          curr_msg.content = [];
        curr_msg.content.push(...content);
      } else {
        if (Array.isArray(curr_msg.content)) {
          if (curr_msg.content[curr_msg.content.length - 1].type === "text")
            curr_msg.content[curr_msg.content.length - 1].text += "\n" + content;
          else
            curr_msg.content.push({ type: "text", text: content });
        } else {
          if (!curr_msg.content)
            curr_msg.content = "";
          else
            curr_msg.content += "\n";
          if (content.startsWith("\\```"))
            content = content.substring(1);
          curr_msg.content += content;
        }
      }
    }
    exports2.add_content_to_message = add_content_to_message;
  }
});

// node_modules/smart-chats/utils/markdown_to_chat_ml.js
var require_markdown_to_chat_ml = __commonJS({
  "node_modules/smart-chats/utils/markdown_to_chat_ml.js"(exports2) {
    var { add_content_to_message } = require_add_content_to_message();
    function markdown_to_chat_ml(markdown) {
      const lines = markdown.split("\n");
      const chat_ml = { messages: [] };
      let current_role = "";
      let tool_name = null;
      let curr_msg = null;
      let is_code_block = false;
      lines.forEach((line) => {
        if (tool_name && curr_msg.role === "tool")
          curr_msg.tool_call_id = tool_name;
        if (line.startsWith("##### ") && !is_code_block) {
          tool_name = null;
          if (curr_msg)
            chat_ml.messages.push({ ...curr_msg });
          current_role = line.substring(6).trim();
          curr_msg = {
            role: current_role
          };
        } else if (line.startsWith("```")) {
          is_code_block = !is_code_block;
          if (line.trim().length > 5 && line.trim().indexOf(" ") < 0) {
            tool_name = line.substring(3).trim();
            if (tool_name === "md")
              return;
            if (["js", "javascript", "dataview"].includes(tool_name))
              return add_content_to_message(curr_msg, line);
            if (["sc-context", "sc-system"].includes(tool_name))
              return add_content_to_message(curr_msg, line);
            if (curr_msg.role === "tool")
              return;
            if (!curr_msg.tool_calls)
              curr_msg.tool_calls = [];
            curr_msg.tool_calls.push({
              id: tool_name,
              type: "function",
              function: {
                name: tool_name,
                arguments: ""
              }
            });
          } else if (["sc-context", "sc-system", "md", "javascript", "js", "dataview"].includes(tool_name)) {
            add_content_to_message(curr_msg, line);
          }
        } else if (line.trim() !== "" && curr_msg) {
          if (tool_name && curr_msg.tool_calls)
            curr_msg.tool_calls[curr_msg.tool_calls.length - 1].function.arguments += line;
          else if (line.match(/!\[.*?\]\((.*?)\)/)) {
            const image_matches = line.matchAll(/^!\[(?<caption>[^\]]*?)\]\((?<imageUrl>[^\)]*?)\)/g);
            const content = [];
            for (const match of image_matches) {
              const caption = match.groups.caption || match.groups.obsidianCaption;
              const imageUrl = match.groups.imageUrl || match.groups.obsidianLink;
              content.push({ type: "image_url", image_url: { url: imageUrl } });
              if (caption)
                content.push({ type: "text", text: `Image caption: ${caption}` });
            }
            add_content_to_message(curr_msg, content);
          } else
            add_content_to_message(curr_msg, line);
        }
      });
      if (curr_msg)
        chat_ml.messages.push({ ...curr_msg });
      return chat_ml;
    }
    exports2.markdown_to_chat_ml = markdown_to_chat_ml;
  }
});

// node_modules/smart-chats/adapters/markdown.js
var require_markdown = __commonJS({
  "node_modules/smart-chats/adapters/markdown.js"(exports2) {
    var { chat_ml_to_markdown } = require_chat_ml_to_markdown();
    var { markdown_to_chat_ml } = require_markdown_to_chat_ml();
    var MarkdownAdapter = class {
      constructor(smart_chat) {
        this.smart_chat = smart_chat;
      }
      /**
       * Returns the file type associated with this class.
       * @returns {string} The file type, which is 'md' for markdown.
       */
      get file_type() {
        return "md";
      }
      /**
       * Updates the internal data with the provided ChatML and saves it.
       * @param {Object} chat_ml - The ChatML object to update the data with.
       */
      async update(chat_ml) {
        this.data = this.from_chatml(chat_ml);
        await this.smart_chat.save();
      }
      // file-type specific parsing and formatting overrides
      /**
       * Retrieves the ChatML representation of the current data.
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.smart_chat.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Converts markdown text to a ChatML object.
       * @param {string} markdown - The markdown string to convert.
       * @returns {Object} The converted ChatML object.
       */
      to_chatml(markdown) {
        return markdown_to_chat_ml(markdown);
      }
      /**
       * Converts a ChatML object to markdown text.
       * @param {Object} chatml - The ChatML object to convert.
       * @returns {string} The converted markdown string.
       */
      from_chatml(chatml) {
        return chat_ml_to_markdown(chatml);
      }
    };
    exports2.MarkdownAdapter = MarkdownAdapter;
    exports2.chat_ml_to_markdown = chat_ml_to_markdown;
    exports2.markdown_to_chat_ml = markdown_to_chat_ml;
  }
});

// node_modules/smart-chats/utils/chatml_to_canvas.js
var require_chatml_to_canvas = __commonJS({
  "node_modules/smart-chats/utils/chatml_to_canvas.js"(exports2) {
    function chatml_to_canvas(chat_ml) {
      const canvas = {
        nodes: [],
        edges: []
      };
      let y_position = 30;
      const x_position = 30;
      const width = 600;
      const height = 300;
      const vertical_spacing = 150;
      chat_ml.messages.forEach((message, index) => {
        const node_id = `${message.role}-${index + 1}`;
        let node_text = "";
        if (message.role === "tool" && message.tool_call_id) {
          node_text += `\`\`\`${message.tool_call_id}
${message.content}
\`\`\``;
        } else if (message.role === "assistant" && message.tool_calls) {
          message.tool_calls.forEach((tool_call) => {
            node_text += `\`\`\`${tool_call.function.name}
`;
            try {
              node_text += `${JSON.stringify(JSON.parse(tool_call.function.arguments))}
`;
            } catch (err) {
              node_text += `${tool_call.function.arguments}
`;
            }
            node_text += `\`\`\`
`;
          });
        } else if (Array.isArray(message.content)) {
          message.content.forEach((contentPart) => {
            if (contentPart.type === "image_url") {
              node_text += `![${contentPart.image_url.caption ? contentPart.image_url.caption : ""}](${contentPart.image_url.url})
`;
            } else if (contentPart.type === "text") {
              node_text += `${contentPart.text}
`;
            }
          });
        } else if (typeof message.content === "string") {
          node_text += message.content;
        }
        canvas.nodes.push({
          id: node_id,
          type: "text",
          x: x_position,
          y: y_position,
          width,
          height,
          text: node_text.trim()
        });
        if (index > 0) {
          const from_node_id = `${chat_ml.messages[index - 1].role}-${index}`;
          const to_node_id = node_id;
          canvas.edges.push({
            id: `${from_node_id}-to-${to_node_id}`,
            fromNode: from_node_id,
            fromSide: "bottom",
            toNode: to_node_id,
            toSide: "top"
          });
        }
        y_position += height + vertical_spacing;
      });
      return canvas;
    }
    exports2.chatml_to_canvas = chatml_to_canvas;
  }
});

// node_modules/smart-chats/utils/canvas_to_chatml.js
var require_canvas_to_chatml = __commonJS({
  "node_modules/smart-chats/utils/canvas_to_chatml.js"(exports2) {
    var { add_content_to_message } = require_add_content_to_message();
    function canvas_to_chatml(canvas) {
      var _a;
      if (typeof canvas === "string" && canvas.trim())
        canvas = JSON.parse(canvas);
      const chat_ml = { messages: [] };
      (_a = canvas.nodes) == null ? void 0 : _a.forEach((node) => {
        let current_role = node.id.split("-")[0];
        let curr_msg = {
          role: current_role
        };
        const lines = node.text.split("\n");
        let is_code_block = false;
        let tool_name = null;
        lines.forEach((line) => {
          var _a2;
          if (line.startsWith("```")) {
            is_code_block = !is_code_block;
            if (is_code_block) {
              tool_name = line.substring(3).trim();
              console.log(tool_name + " " + curr_msg.role);
              if (is_tool_call(curr_msg.role, tool_name)) {
                console.log("tool call");
                if (!curr_msg.tool_calls) {
                  curr_msg.tool_calls = [];
                }
                curr_msg.tool_calls.push({
                  id: tool_name,
                  type: "function",
                  function: {
                    name: tool_name,
                    arguments: ""
                  }
                });
              } else {
                if (curr_msg.role === "tool" && line.trim() !== "") {
                  curr_msg.tool_call_id = tool_name;
                } else {
                  add_content_to_message(curr_msg, line);
                }
              }
            } else {
              if (curr_msg.role !== "tool" && !((_a2 = curr_msg.tool_calls) == null ? void 0 : _a2.length)) {
                add_content_to_message(curr_msg, line);
              }
              tool_name = null;
            }
          } else if (is_code_block && is_tool_call(curr_msg.role, tool_name)) {
            console.log(line);
            const last_tool_call = curr_msg.tool_calls[curr_msg.tool_calls.length - 1];
            if (last_tool_call.function.arguments) {
              last_tool_call.function.arguments += "\n";
            }
            last_tool_call.function.arguments += line;
          } else if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
            const content = [];
            const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
            const caption = match[1];
            const imageUrl = match[2];
            content.push({ type: "image_url", image_url: { url: imageUrl } });
            if (caption) {
              content.push({ type: "text", text: `Image caption: ${caption}` });
            }
            add_content_to_message(curr_msg, content);
          } else {
            add_content_to_message(curr_msg, line);
          }
        });
        if (Array.isArray(curr_msg.content) && curr_msg.content.length === 1 && curr_msg.content[0].type === "text") {
          curr_msg.content = curr_msg.content[0].text;
        }
        chat_ml.messages.push(curr_msg);
      });
      return chat_ml;
    }
    exports2.canvas_to_chatml = canvas_to_chatml;
    function is_tool_call(role, tool_name) {
      if (role === "tool")
        return false;
      if ([
        "sc-context",
        "sc-system",
        "js",
        "javascript",
        "dataview",
        "html",
        "css",
        "scss",
        "less",
        "md"
      ].includes(tool_name))
        return false;
      return true;
    }
  }
});

// node_modules/smart-chats/adapters/canvas.js
var require_canvas = __commonJS({
  "node_modules/smart-chats/adapters/canvas.js"(exports2) {
    var { chatml_to_canvas } = require_chatml_to_canvas();
    var { canvas_to_chatml } = require_canvas_to_chatml();
    var CanvasAdapter = class {
      constructor(smart_chat) {
        this.smart_chat = smart_chat;
      }
      /**
       * Returns the file type associated with this class.
       * @returns {string} The file type, which is 'canvas' for canvas.
       */
      get file_type() {
        return "canvas";
      }
      /**
       * Updates the internal data with the provided ChatML and saves it.
       * @param {Object} chat_ml - The ChatML object to update the data with.
       */
      async update(chat_ml) {
        this.smart_chat.data = this.from_chatml(chat_ml);
        await this.smart_chat.save();
      }
      // file-type specific parsing and formatting overrides
      /**
       * Retrieves the ChatML representation of the current data.
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.smart_chat.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Converts markdown text to a ChatML object.
       * @param {string} markdown - The markdown string to convert.
       * @returns {Object} The converted ChatML object.
       */
      to_chatml(markdown) {
        return canvas_to_chatml(markdown);
      }
      /**
       * Converts a ChatML object to markdown text.
       * @param {Object} chatml - The ChatML object to convert.
       * @returns {string} The converted markdown string.
       */
      from_chatml(chatml) {
        return chatml_to_canvas(chatml);
      }
      async save() {
        return await this.smart_chat.chats.save(this.smart_chat.file_path, JSON.stringify(this.smart_chat.data));
      }
    };
    exports2.CanvasAdapter = CanvasAdapter;
    exports2.chatml_to_canvas = chatml_to_canvas;
    exports2.canvas_to_chatml = canvas_to_chatml;
  }
});

// node_modules/smart-chats/adapters.js
var require_adapters3 = __commonJS({
  "node_modules/smart-chats/adapters.js"(exports2) {
    var { MarkdownAdapter } = require_markdown();
    var { CanvasAdapter } = require_canvas();
    exports2.md = MarkdownAdapter;
    exports2.canvas = CanvasAdapter;
  }
});

// node_modules/smart-chats/smart_chat.js
var require_smart_chat = __commonJS({
  "node_modules/smart-chats/smart_chat.js"(exports2) {
    var SmartChatAdapters = require_adapters3();
    var SmartChat = class {
      constructor(env, opts = {}) {
        let {
          key = "UNTITLED CHAT " + get_file_date_string(),
          data = "",
          file_type = null
        } = opts;
        this.env = env;
        this.chats = this.env.chats;
        this.key = key;
        this.data = data;
        this.scope = {};
        if (file_type)
          this.adapter = new SmartChatAdapters[file_type](this);
        if (this.chats)
          this.chats.items[this.key] = this;
      }
      /**
       * Factory method to create a new SmartChat instance with a unique key or a default one.
       * 
       * @static
       * @param {SmartEnv} env - The SmartChat environment object.
       * @param {string} [key=null] - Optional key for the chat session. If not provided, a default is generated.
       * @param {string} [data=''] - Initial data for the chat session.
       * @returns {SmartChat} A new instance of SmartChat.
       */
      static create(env, opts = {}) {
        const chat = new this(env, opts);
        return chat;
      }
      /**
       * Computes the file path for the current chat session based on its key and file type.
       * 
       * @returns {string} The file path for the chat session.
       */
      get file_path() {
        return `${this.chats.folder}/${this.key}.${this.file_type}`;
      }
      /**
       * Returns the name (key) of the chat session.
       * 
       * @returns {string} The key of the chat session.
       */
      get name() {
        return this.key;
      }
      /**
       * Renames the current chat session and updates the storage references.
       * 
       * @param {string} new_id - The new identifier for the chat session.
       * @returns {Promise<void>}
       */
      async rename(new_id) {
        if (this.key === new_id)
          return;
        if (await this.exists())
          await this.delete();
        delete this.chats.items[this.key];
        this.key = new_id;
        this.chats.items[this.key] = this;
        await this.save();
      }
      /**
       * Retrieves all messages from the chat session and converts them to HTML format.
       * 
       * @returns {Promise<string>} A string containing all messages in HTML format.
       */
      async get_messages_html() {
        const messages = await this.get_messages();
        const html = await Promise.all(messages.map(async (msg) => {
          if (!msg.content)
            return "";
          if (msg.role === "system")
            return await this.env.chat_ui.get_system_message_html(msg);
          return await this.env.chat_ui.get_message_html(msg.role, msg.content);
        }));
        return html.join("");
      }
      /**
       * Adds a new message to the chat session.
       * 
       * @param {Object} [msg={}] - The message object to add.
       * @returns {Promise<void>}
       */
      async add_message(msg = {}) {
        const chat_ml = await this.get_chat_ml();
        chat_ml.messages.push(msg);
        await this.update(chat_ml);
      }
      async remove_last_message() {
        const chat_ml = await this.get_chat_ml();
        chat_ml.messages.pop();
        await this.update(chat_ml);
      }
      /**
       * Adds output from a tool to the chat session as a message.
       * 
       * @param {string} tool_name - The name of the tool.
       * @param {*} tool_output - The output from the tool.
       * @returns {Promise<void>}
       */
      async add_tool_output(tool_name, tool_output) {
        if (typeof this.env.actions.parse_tool_output === "function") {
          const message = await this.env.actions.parse_tool_output(tool_name, tool_output);
          if (message)
            return await this.add_message(message);
        }
        await this.add_message({ role: "tool", tool_call_id: tool_name, content: JSON.stringify(tool_output) });
      }
      // file-type specific parsing and formatting overrides
      /**
       * Updates the chat session data with the provided ChatML object and saves it.
       * 
       * @param {Object} chat_ml - The ChatML object to update the session with.
       * @returns {Promise<void>}
       */
      async update(chat_ml) {
        this.data = this.from_chatml(chat_ml);
        await this.save();
      }
      /**
       * Saves the current chat session data to the file system.
       * 
       * @returns {Promise<void>}
       */
      async save() {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.save) === "function")
          return await this.adapter.save();
        return await this.chats.save(this.file_path, this.data);
      }
      /**
       * Deletes the chat session file from the file system.
       * 
       * @returns {Promise<void>}
       */
      async delete() {
        return await this.chats.delete(this.file_path);
      }
      /**
       * Checks if the chat session file exists in the file system.
       * 
       * @returns {Promise<boolean>} True if the file exists, false otherwise.
       */
      async exists() {
        return await this.chats.exists(this.file_path);
      }
      /**
       * Loads the chat session data from the file system.
       * 
       * @returns {Promise<string>} The loaded data.
       */
      async load() {
        if (!await this.exists()) {
          return this.data = "";
        }
        return this.data = await this.chats.read(this.file_path);
      }
      /**
       * Retrieves the ChatML object from the current session data.
       * 
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Retrieves all messages from the ChatML object of the current session.
       * 
       * @returns {Promise<Array>} An array of message objects.
       */
      async get_messages() {
        return (await this.get_chat_ml()).messages;
      }
      /**
       * Processes a new user message, updates UI/UX, and adds it to the chat session.
       * 
       * @param {string} content - The content of the user message.
       * @returns {Promise<void>}
       */
      async new_user_message(content) {
        var _a, _b, _c, _d, _e;
        const og_content = content;
        content = await this.parse_user_message(content);
        if (typeof ((_b = (_a = this.env) == null ? void 0 : _a.chat_ui) == null ? void 0 : _b.new_user_message) === "function")
          await this.env.chat_ui.new_user_message(og_content);
        if (typeof ((_d = (_c = this.env) == null ? void 0 : _c.actions) == null ? void 0 : _d.new_user_message) === "function")
          await this.env.actions.new_user_message(content);
        if (typeof ((_e = this.chats) == null ? void 0 : _e.new_user_message) === "function")
          await this.chats.new_user_message(content);
        await this.add_message({ role: "user", content });
        await this.env.chat_model.complete({});
      }
      // Override these for file-type specific parsing and formatting in subclasses
      /**
       * Returns the file type for the chat session, used in file operations.
       * 
       * @returns {string} The file type, default is 'json'.
       */
      get file_type() {
        var _a;
        if ((_a = this.adapter) == null ? void 0 : _a.file_type)
          return this.adapter.file_type;
        return "json";
      }
      /**
       * Converts the provided data into a ChatML object. This method should be overridden in subclasses.
       * 
       * @param {string} data - The data to convert.
       * @returns {Object} The ChatML object.
       */
      to_chatml(data) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.to_chatml) === "function")
          return this.adapter.to_chatml(data);
        return data;
      }
      /**
       * Converts a ChatML object back into a string or suitable format for storage. This method should be overridden in subclasses.
       * 
       * @param {Object} data - The ChatML object to convert.
       * @returns {string} The string or formatted data.
       */
      from_chatml(data) {
        var _a;
        if (typeof ((_a = this.adapter) == null ? void 0 : _a.from_chatml) === "function")
          return this.adapter.from_chatml(data);
        return data;
      }
      /**
       * Parses the user message content before adding it to the chat. This method can be overridden to include custom parsing logic.
       * 
       * @param {string} content - The content to parse.
       * @returns {Promise<string>} The parsed content.
       */
      async parse_user_message(content) {
        return content;
      }
    };
    function get_file_date_string() {
      return (/* @__PURE__ */ new Date()).toISOString().replace(/(T|:|\..*)/g, " ").trim();
    }
    exports2.SmartChat = SmartChat;
  }
});

// node_modules/smart-chats/smart_chats.js
var require_smart_chats = __commonJS({
  "node_modules/smart-chats/smart_chats.js"(exports2) {
    var { SmartChat } = require_smart_chat();
    var SmartChats = class {
      /**
       * Creates an instance of SmartChats.
       * @param {Object} env - The environment context, used across the chat system.
       * @param {Object} [opts={}] - Optional parameters to configure the SmartChats instance.
       */
      constructor(env, opts = {}) {
        this.env = env;
        this.folder = "smart-chats";
        this.items = {};
        this.default_file_type = "md";
        this.chat_class = SmartChat;
        Object.assign(this, opts);
      }
      /**
       * Creates a new chat instance and initializes the chat UI.
       */
      async new() {
        if (this.current) {
          await this.current.save();
          this.current = null;
        }
        this.current = this.create_chat();
        console.log({ current: this.current });
        await this.env.chat_ui.init();
      }
      create_chat(opts = {}) {
        if (!opts.file_type)
          opts.file_type = this.default_file_type;
        return this.chat_class.create(this.env, opts);
      }
      /**
       * Loads all conversations from the filesystem and initializes them.
       */
      async load_all() {
        if (!await this.exists(this.folder))
          await this.create_folder(this.folder);
        const convos = await this.get_conversation_ids_and_file_types();
        convos.forEach(([conversation_id, file_type]) => {
          this.items[conversation_id] = this.create_chat({ key: conversation_id, file_type });
        });
      }
      /**
       * Saves a chat conversation by its key.
       * If the chat does not exist, it creates a new one.
       * @param {string} key - The key identifier for the chat.
       * @param {string} chat_ml - The chat content in markup language.
       */
      async save(key, chat_ml) {
        let chat = this.items[key];
        if (!chat) {
          console.log("Creating new conversation");
          chat = this.create_chat(key, chat_ml);
        }
        await chat.save(chat_ml);
      }
      /**
       * Retrieves conversation IDs and their corresponding file types from the filesystem.
       * @returns {Promise<Array<Array<string>>>} An array of conversation IDs and file types.
       */
      async get_conversation_ids_and_file_types() {
        console.log("get_conversation_ids_and_file_types");
        const folder = await this.list(this.folder);
        console.log(folder);
        const files = folder.files.map((file) => {
          const file_type = file.split(".").pop();
          const conversation_id = file.replace(this.folder + "/", "").replace("." + file_type, "");
          return [conversation_id, file_type];
        });
        return files;
      }
      // Platform-specific methods to be overridden in subclasses or instances
      async open(conversation_id) {
      }
      async load(path) {
      }
      async save(path, file_content) {
      }
      async delete(path) {
      }
      async exists(path) {
      }
      async create_folder(path) {
      }
      async list(path) {
      }
    };
    exports2.SmartChats = SmartChats;
    exports2.SmartChat = SmartChat;
  }
});

// src/extract_folder_references.js
var require_extract_folder_references = __commonJS({
  "src/extract_folder_references.js"(exports2) {
    function extract_folder_references(folders, user_input) {
      folders = folders.slice();
      const matches = folders.sort((a, b) => b.length - a.length).map((folder) => {
        if (user_input.indexOf(folder) !== -1) {
          user_input = user_input.replace(folder, "");
          return folder;
        }
        return false;
      }).filter((folder) => folder);
      console.log(matches);
      if (matches)
        return matches;
      return false;
    }
    exports2.extract_folder_references = extract_folder_references;
  }
});

// src/contains_internal_link.js
var require_contains_internal_link = __commonJS({
  "src/contains_internal_link.js"(exports2) {
    function contains_internal_link(user_input) {
      if (user_input.indexOf("[[") === -1)
        return false;
      if (user_input.indexOf("]]") === -1)
        return false;
      return true;
    }
    exports2.contains_internal_link = contains_internal_link;
  }
});

// src/contains_folder_reference.js
var require_contains_folder_reference = __commonJS({
  "src/contains_folder_reference.js"(exports2) {
    function contains_folder_reference(user_input) {
      const first_slash = user_input.indexOf("/");
      if (first_slash === -1)
        return false;
      const last_slash = user_input.lastIndexOf("/");
      if (last_slash - first_slash <= 1)
        return false;
      const first_open_parentheses = user_input.indexOf("(");
      const first_close_parentheses = user_input.indexOf(")");
      if (first_open_parentheses > first_slash && first_close_parentheses < last_slash)
        return true;
      if (first_open_parentheses !== -1 && first_close_parentheses !== -1) {
        const start = user_input.indexOf("(");
        const end = user_input.indexOf(")");
        const without_content_in_parentheses = user_input.slice(0, start) + user_input.slice(end + 1);
        if (without_content_in_parentheses.indexOf("/") !== -1)
          return false;
        if (without_content_in_parentheses.indexOf("/") === without_content_in_parentheses.lastIndexOf("/"))
          return false;
      }
      return true;
    }
    exports2.contains_folder_reference = contains_folder_reference;
  }
});

// src/sc_chat.js
var require_sc_chat = __commonJS({
  "src/sc_chat.js"(exports2) {
    var { SmartChat } = require_smart_chat();
    var { extract_folder_references } = require_extract_folder_references();
    var { contains_internal_link } = require_contains_internal_link();
    var { contains_folder_reference } = require_contains_folder_reference();
    var ScChat = class extends SmartChat {
      async new_user_message(content) {
        const og_content = content;
        try {
          await super.new_user_message(content);
        } catch (e) {
          this.env.plugin.notices.show(e.message, e.message);
          console.warn(e);
          this.env.chat_ui.undo_last_message();
          this.env.chat_ui.set_chat_input_text(og_content);
        }
      }
      /**
       * Parses a user message to handle special syntax like mentions and converts them into system messages.
       * @param {string} content - The user message content.
       * @returns {Promise<string>} The processed content with mentions handled.
       */
      async parse_user_message(content) {
        this.env.chats.current.scope = {};
        if (content.includes('@"')) {
          const mention_pattern = /@\"([^"]+)\"/;
          const mention = content.match(mention_pattern)[1];
          const sys_msg = {
            role: "system",
            content: "```sc-system\n" + mention + "\n```"
          };
          await this.add_message(sys_msg);
          const sys_msg_html = await this.env.chat_ui.get_system_message_html(sys_msg);
          await this.env.chat_ui.message_container.insertAdjacentHTML("beforeend", sys_msg_html);
          content = content.replace(mention_pattern, "").trim();
        }
        if (contains_internal_link(content)) {
          const notes = extract_internal_links(this.env, content);
          console.log(notes);
          if (notes.length) {
            const context = "```sc-context\n" + notes.map((n) => `${n.path}`).join("\n") + "\n```";
            const context_msg = { role: "system", content: context };
            await this.add_message(context_msg);
            const context_msg_html = await this.env.chat_ui.get_system_message_html(context_msg);
            await this.env.chat_ui.message_container.insertAdjacentHTML("beforeend", context_msg_html);
          }
        }
        if (contains_folder_reference(content)) {
          const folders = await this.env.plugin.get_folders();
          const folder_refs = extract_folder_references(folders, content);
          console.log(folder_refs);
          if (folder_refs)
            this.env.chats.current.scope.key_starts_with_any = folder_refs;
          console.log(this.env.chats.current.scope);
        }
        return content;
      }
      async add_tool_output(tool_name, tool_output) {
        await super.add_tool_output(tool_name, tool_output);
        await this.env.chat_ui.init();
        await this.env.chat_ui.render_dotdotdot();
      }
    };
    exports2.ScChat = ScChat;
    function extract_internal_links(env, user_input) {
      const matches = user_input.match(/\[\[(.*?)\]\]/g);
      console.log(matches);
      if (matches)
        return matches.map((match) => {
          const tfile = env.plugin.app.metadataCache.getFirstLinkpathDest(match.replace("[[", "").replace("]]", ""), "/");
          return tfile;
        });
      return [];
    }
    exports2.extract_internal_links = extract_internal_links;
  }
});

// src/sc_chats.js
var require_sc_chats = __commonJS({
  "src/sc_chats.js"(exports2) {
    var { SmartChats } = require_smart_chats();
    var { ScChat } = require_sc_chat();
    var { FuzzySuggestModal } = require("obsidian");
    var ScChats = class extends SmartChats {
      constructor(env, opts = {}) {
        super(env, opts);
        this.plugin = this.env.plugin;
        this.folder = this.env.config.smart_chat_folder || this.folder;
        this.chat_class = ScChat;
      }
      async new_user_message(message) {
        var _a;
        if (this.env.config.chat_model_platform_key === "open_router" && !((_a = this.env.config.open_router) == null ? void 0 : _a.api_key)) {
          this.env.config.free_chat_uses = this.env.config.free_chat_uses || 0;
          this.env.config.free_chat_uses++;
          if (this.env.config.free_chat_uses > 2) {
            this.env.plugin.notices.show("shared usage", "Your chats are currently using a community account with very limited usage. Please add your own API key in the Smart Chat settings to enable unlimited personal usage and prevent exhausting the shared account limit.", { immutable: true, timeout: 2e4 });
          }
          return;
        }
        return message;
      }
      // platform specific overrides
      open(key) {
        this.current = this.items[key];
        this.env.chat_ui.init();
      }
      async read(path) {
        return await this.plugin.app.vault.adapter.read(path);
      }
      normalize_path(path) {
        return this.plugin.obsidian.normalizePath(path);
      }
      async save(path, file_content) {
        await this.plugin.app.vault.adapter.write(this.normalize_path(path), file_content);
      }
      async delete(path) {
        await this.plugin.app.vault.adapter.remove(path);
      }
      async exists(path) {
        return await this.plugin.app.vault.adapter.exists(path);
      }
      async create_folder(path) {
        return await this.plugin.app.vault.adapter.mkdir(path);
      }
      async list(path) {
        return await this.plugin.app.vault.adapter.list(path);
      }
      // CUSTOM
      open_modal() {
        if (!this.modal)
          this.modal = new ScChatHistoryModal(this.plugin.app, this.env);
        this.modal.open();
      }
      // // backwords compatibility
      // async import_v1_chats() {
      //   const files = await this.list('.smart-connections/chats');
      //   console.log(files);
      //   for (let i = 0; i < files.files.length; i++) {
      //     const file = files.files[i];
      //     const chat_id = file.replace('.smart-connections/chats/', '').replace('.json', '');
      //     const messages = [];
      //     JSON.parse(await this.read(file))
      //       .map(msg => msg[0])
      //       .forEach(msg => {
      //         if (msg.role === "user") return messages.push({
      //           role: "user",
      //           content: msg.content,
      //         });
      //         if (msg.hyd) messages.push({
      //           role: "assistant",
      //           content: null,
      //           tool_calls: [{
      //             function: {
      //               name: "find_notes",
      //               args: JSON.stringify({ hypotheticals: [msg.hyd] })
      //             }
      //           }]
      //         });
      //         if (msg.context) {
      //           // const context_links = [];
      //           // msg.context.split('\n').forEach((line, i, arr) => {
      //           //   if(line.startsWith('---BEGIN') && arr[i+1]){
      //           //     const breadcrumbs = arr[i+1].replace(': ', '#').split(' > '); // remove last char (:) and split by ' > '
      //           //     const link_path = breadcrumbs.map(breadcrumb => breadcrumb.trim()).join('/');
      //           //     context_links.push(link_path);
      //           //   }
      //           // });
      //           // messages.push({
      //           //   role: "system",
      //           //   content: 'BEGIN NOTES AS CONTEXT:\n[['+context_links.join(']]\n[[')+']]'
      //           // });
      //           messages.push({
      //             role: "system",
      //             content: "```smart-connections\n" + msg.hyd + "\n```"
      //           });
      //           // // get last user message from messages and add again
      //           // const last_user_msg = messages[messages.findLastIndex(m => m.role === "user")];
      //           // messages.push(last_user_msg);
      //         }
      //         if (msg.role === "assistant") return messages.push({
      //           role: "assistant",
      //           content: msg.content,
      //         });
      //       });
      //     console.log(messages);
      //     const convo = this.conversation_format.create(this, chat_id, chat_ml_to_markdown({ messages }));
      //     await convo.save();
      //   }
      // }
    };
    exports2.ScChats = ScChats;
    var ScChatHistoryModal = class extends FuzzySuggestModal {
      constructor(app, env) {
        super(app);
        this.app = app;
        this.env = env;
        this.setPlaceholder("Type the name of a chat session...");
      }
      // getItems() { return (this.view.files) ? this.view.files : []; }
      // sort alphabetically & then by startsWith UNITITLED
      getItems() {
        return Object.keys(this.env.chats.items).sort((a, b) => a.localeCompare(b)).sort((a, b) => b.startsWith("UNTITLED") ? -1 : 1);
      }
      // if not UNTITLED, remove date after last em dash
      getItemText(item) {
        return item.indexOf("UNTITLED") === -1 ? item.replace(/—[^—]*$/, "") : item;
      }
      // onChooseItem(session) { this.view.open_chat(session); }
      onChooseItem(conversation_id) {
        this.env.chats.open(conversation_id);
      }
    };
  }
});

// build/actions_openapi.json
var require_actions_openapi = __commonJS({
  "build/actions_openapi.json"(exports2, module2) {
    module2.exports = {
      openapi: "3.0.0",
      paths: {
        "/lookup": {
          post: {
            operationId: "lookup",
            summary: "Semantic search",
            description: "Performs a semantic search of the user's data. Required: hypothetical_1 and hypothetical_2. Optional: hypothetical_3.",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      hypothetical_1: {
                        type: "string",
                        description: "Short hypothetical notes predicted to be semantically similar to the notes necessary to fulfill the user's request. At least three hypotheticals per request. The hypothetical notes may contain paragraphs, lists, or checklists in markdown format. Hypothetical notes always begin with breadcrumbs containing the anticipated folder(s), file name, and relevant headings separated by ' > ' (no slashes). Example: PARENT FOLDER NAME > CHILD FOLDER NAME > FILE NAME > HEADING 1 > HEADING 2 > HEADING 3: HYPOTHETICAL NOTE CONTENTS."
                      },
                      hypothetical_2: {
                        type: "string",
                        description: "Must be distinct from and not share any breadcrumbs with hypothetical_1."
                      },
                      hypothetical_3: {
                        type: "string",
                        description: "Must be distinct from hypothetical_1 and hypothetical_2."
                      }
                    },
                    required: [
                      "hypothetical_1",
                      "hypothetical_2"
                    ]
                  }
                }
              }
            }
          }
        }
      },
      components: {},
      tags: []
    };
  }
});

// src/actions/lookup.js
var require_lookup = __commonJS({
  "src/actions/lookup.js"(exports2) {
    async function lookup(env, params = {}) {
      var _a, _b, _c, _d, _e;
      console.log("lookup", params);
      const { hypotheticals = [], hypothetical_1, hypothetical_2, hypothetical_3 } = params;
      if (hypothetical_1)
        hypotheticals.push(hypothetical_1);
      if (hypothetical_2)
        hypotheticals.push(hypothetical_2);
      if (hypothetical_3)
        hypotheticals.push(hypothetical_3);
      if (!hypotheticals)
        return { error: "hypotheticals is required" };
      const collection = ((_a = env.smart_blocks) == null ? void 0 : _a.smart_embed) ? env.smart_blocks : env.smart_notes;
      console.log(collection);
      if (!collection || !collection.smart_embed)
        return { error: "Embedding search is not enabled." };
      const embeddings = await collection.smart_embed.embed_batch(hypotheticals.map((h) => ({ embed_input: h })));
      console.log(embeddings);
      console.log({ scope: (_c = (_b = env.chats) == null ? void 0 : _b.current) == null ? void 0 : _c.scope });
      const filter = {
        ...((_e = (_d = env.chats) == null ? void 0 : _d.current) == null ? void 0 : _e.scope) || {},
        ...params.filter || {}
      };
      console.log({ filter });
      const results = embeddings.flatMap((embedding, i) => {
        return collection.nearest(embedding.vec, filter);
      });
      results.sort((a, b) => {
        if (a.sim === b.sim)
          return 0;
        return a.sim > b.sim ? -1 : 1;
      });
      const k = params.k || env.config.lookup_k || 10;
      let top_k = await Promise.all(
        results.slice(0, k).filter((r, i, a) => a.findIndex((t) => t.data.path === r.data.path) === i).map(async (r) => {
          return {
            score: r.sim,
            path: r.data.path
          };
        })
      );
      console.log(top_k);
      console.log(`Found and returned ${top_k.length} ${collection.collection_name}.`);
      return top_k;
    }
    exports2.lookup = lookup;
    function cos_sim(vector1, vector2) {
      const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
      const normA = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
      const normB = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
      return normA === 0 || normB === 0 ? 0 : dotProduct / (normA * normB);
    }
    function top_acc(_acc, item, ct = 10) {
      if (_acc.items.size < ct) {
        _acc.items.add(item);
      } else if (item.sim > _acc.min) {
        _acc.items.add(item);
        _acc.items.delete(_acc.minItem);
        _acc.minItem = Array.from(_acc.items).reduce((min, curr) => curr.sim < min.sim ? curr : min);
        _acc.min = _acc.minItem.sim;
      }
    }
    exports2.top_acc = top_acc;
    function get_nearest_until_next_dev_exceeds_std_dev(nearest) {
      if (nearest.length === 0)
        return [];
      const sims = nearest.map((n) => n.sim);
      const mean = sims.reduce((a, b) => a + b) / sims.length;
      let std_dev = Math.sqrt(sims.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / sims.length);
      let slice_i = 0;
      while (slice_i < nearest.length) {
        const next = nearest[slice_i + 1];
        if (next) {
          const next_dev = Math.abs(next.sim - nearest[slice_i].sim);
          if (next_dev > std_dev) {
            if (slice_i < 3)
              std_dev = std_dev * 1.5;
            else
              break;
          }
        }
        slice_i++;
      }
      nearest = nearest.slice(0, slice_i + 1);
      return nearest;
    }
    exports2.get_nearest_until_next_dev_exceeds_std_dev = get_nearest_until_next_dev_exceeds_std_dev;
    function sort_by_len_adjusted_similarity(nearest) {
      nearest = nearest.sort((a, b) => {
        const a_score = a.sim / a.tokens;
        const b_score = b.sim / b.tokens;
        if (a_score > b_score)
          return -1;
        if (a_score < b_score)
          return 1;
        return 0;
      });
      return nearest;
    }
    exports2.sort_by_len_adjusted_similarity = sort_by_len_adjusted_similarity;
    function get_top_k_by_sim(results, opts) {
      return Array.from(results.reduce((acc, item) => {
        var _a;
        if (!((_a = item.data.embedding) == null ? void 0 : _a.vec))
          return acc;
        item.sim = cos_sim(opts.vec, item.data.embedding.vec);
        top_acc(acc, item, opts.k);
        return acc;
      }, { min: 0, items: /* @__PURE__ */ new Set() }).items);
    }
    exports2.get_top_k_by_sim = get_top_k_by_sim;
  }
});

// src/actions/_actions.js
var require_actions = __commonJS({
  "src/actions/_actions.js"(exports2) {
    var { lookup } = require_lookup();
    exports2.lookup = lookup;
  }
});

// src/json_ref_resolve.js
var require_json_ref_resolve = __commonJS({
  "src/json_ref_resolve.js"(exports2) {
    function json_ref_resolve(schema, rootSchema = null) {
      rootSchema = rootSchema || schema;
      if (typeof schema === "object" && !Array.isArray(schema) && schema !== null) {
        if (schema.hasOwnProperty("$ref")) {
          const refPath = schema["$ref"];
          try {
            const resolvedSchema = get_schema_by_path(rootSchema, refPath);
            return json_ref_resolve(resolvedSchema, rootSchema);
          } catch (e) {
            console.log(`Error resolving ref: ${refPath}`, e);
            return schema;
          }
        } else {
          Object.keys(schema).forEach((key) => {
            schema[key] = json_ref_resolve(schema[key], rootSchema);
          });
        }
      }
      return schema;
    }
    exports2.json_ref_resolve = json_ref_resolve;
    function get_schema_by_path(rootSchema, path) {
      const parts = path.split("/").slice(1);
      let currentSchema = rootSchema;
      for (let part of parts) {
        currentSchema = currentSchema[part];
        if (!currentSchema) {
          throw new Error(`Reference not found: ${path}`);
        }
      }
      return currentSchema;
    }
  }
});

// src/sc_actions.js
var require_sc_actions = __commonJS({
  "src/sc_actions.js"(exports2) {
    var ScTranslations = require_ScTranslations();
    var openapi_spec = require_actions_openapi();
    var handlers = require_actions();
    var { lookup } = require_lookup();
    var { json_ref_resolve } = require_json_ref_resolve();
    var ScActions = class {
      constructor(env, opts = {}) {
        this.env = env;
        this.plugin = this.env.plugin;
        this.app = this.plugin.app;
        this.config = this.plugin.settings;
        this.actions = {};
      }
      init() {
        this.parse_actions_from_openapi(openapi_spec);
      }
      prepare_request_body(body) {
        var _a, _b;
        if ((_a = this.env.chats) == null ? void 0 : _a.current.tool_choice) {
          const tool_choice = this.env.chats.current.tool_choice;
          if (body.tool_choice !== "auto") {
            const tool_json = (_b = this.actions[tool_choice]) == null ? void 0 : _b.json;
            if (tool_json) {
              body.tool_choice = {
                type: "function",
                function: { name: tool_choice }
              };
              body.tools = [tool_json];
            }
          } else {
            body.tool_choice = "auto";
            body.tools = this.env.actions.actions.map((t) => t.json);
          }
        }
        console.log(body);
        return body;
      }
      // v2.1
      // DO: decided: rename to parse_user_message?
      async new_user_message(user_input) {
        if (Array.isArray(user_input)) {
          for (let i = 0; i < user_input.length; i++) {
            if (user_input[i].type === "text") {
              await this.new_user_message(user_input[i].text);
            }
          }
          return;
        }
        if (this.should_trigger_retrieval(user_input)) {
          console.log("should trigger retrieval");
          if (this.actions.lookup && this.env.chat_model.config.actions) {
            this.env.chats.current.tool_choice = "lookup";
          } else {
            await this.get_context_hyde(user_input);
          }
        }
      }
      should_trigger_retrieval(user_input) {
        if (this.contains_self_referential_keywords(user_input))
          return true;
        if (this.env.chats.current.scope.key_starts_with_any)
          return true;
        return false;
      }
      // check if includes keywords referring to one's own notes
      contains_self_referential_keywords(user_input) {
        if (user_input.match(new RegExp(`\\b(${ScTranslations[this.config.language].pronouns.join("|")})\\b`, "gi")))
          return true;
        return false;
      }
      // BACKWARD COMPATIBILITY for non-function-calling models (DEPRECATED)
      async get_context_hyde(user_input) {
        console.log("get_context_hyde");
        const hyd_input = `Anticipate what the user is seeking. Respond in the form of a hypothetical note written by the user. The note may contain statements as paragraphs, lists, or checklists in markdown format with no headings. Please respond with one hypothetical note and abstain from any other commentary. Use the format: PARENT FOLDER NAME > CHILD FOLDER NAME > FILE NAME > HEADING 1 > HEADING 2 > HEADING 3: HYPOTHETICAL NOTE CONTENTS.`;
        const chatml = [
          { role: "system", content: hyd_input },
          { role: "user", content: user_input }
        ];
        const hyd = await this.env.chat_model.complete(
          {
            messages: chatml,
            stream: false,
            temperature: 0,
            max_tokens: 420
            // n: 3, // DO: multiple completions (unavailable in Anthropic Claude)
          },
          false
          // skip render
        );
        this.env.chats.current.add_message({
          role: "assistant",
          tool_calls: [{
            function: {
              name: "lookup",
              arguments: JSON.stringify({ hypotheticals: [hyd] })
            }
          }]
        });
        const results = await lookup(this.env, { hypotheticals: [hyd] });
        await this.env.chats.current.add_tool_output("lookup", results);
        return;
      }
      parse_tool_output(tool_name, tool_output) {
        if (tool_name === "lookup")
          return parse_lookup_tool_output(tool_output);
      }
      parse_actions_from_openapi(openapi_spec2) {
        openapi_spec2 = json_ref_resolve(openapi_spec2);
        Object.entries(openapi_spec2.paths).flatMap(
          ([path, methods]) => Object.entries(methods).forEach(([method, spec]) => {
            var _a, _b;
            const { operationId, requestBody, description } = spec;
            this.actions[operationId] = {
              json: {
                type: "function",
                function: {
                  name: operationId,
                  description,
                  parameters: {
                    type: "object",
                    properties: (_b = (_a = requestBody == null ? void 0 : requestBody.content["application/json"]) == null ? void 0 : _a.schema) == null ? void 0 : _b.properties
                  }
                }
              },
              handler: this.get_handler(operationId, path, method, spec),
              enabled: operationId === "lookup" || operationId === "create_note"
            };
          })
        );
      }
      get_handler(operationId, path, method, spec) {
        return handlers[operationId];
      }
    };
    exports2.ScActions = ScActions;
    function parse_lookup_tool_output(tool_output) {
      let content = "```sc-context\n";
      tool_output.forEach((note, i) => {
        content += `${note.path}
`;
      });
      content += "```";
      return { role: "system", content };
    }
  }
});

// src/sc_env.js
var require_sc_env = __commonJS({
  "src/sc_env.js"(exports2) {
    var { Brain } = require_Brain();
    var { SmartMarkdown } = require_smart_chunks();
    var {
      SmartNotes,
      SmartBlocks,
      SmartNote,
      SmartBlock
    } = require_sc_entities();
    var { DataviewSocket } = require_dataview_socket();
    var templates = require_views();
    var ejs = require_ejs_min();
    var { ScChatModel } = require_sc_chat_model();
    var { ScChatsUI } = require_sc_chats_ui();
    var { ScChats } = require_sc_chats();
    var { ScActions } = require_sc_actions();
    var ScEnv2 = class extends Brain {
      constructor(plugin, ltm_adapter) {
        super(ltm_adapter);
        this.plugin = plugin;
        this.main = this.plugin;
        this.config = this.plugin.settings;
        this.data_path = this.config.smart_connections_folder;
        this.collections = {
          smart_notes: SmartNotes,
          smart_blocks: SmartBlocks
        };
        this.item_types = {
          SmartNote,
          SmartBlock
        };
        this.save_timeout = null;
        this.smart_embed_active_models = {};
        this.local_model_type = "Web";
        this.dv_ws = null;
        this.chat = null;
        this.ejs = ejs;
        this.templates = templates;
      }
      get chat_classes() {
        return { ScActions, ScChatsUI, ScChats, ScChatModel };
      }
      async reload() {
        this.unload();
        this.config = this.plugin.settings;
        await this.init();
      }
      unload() {
        this.unload_entities();
        this.smart_embed_active_models = {};
        if (this.dv_ws)
          this.dv_ws.unload();
      }
      unload_entities() {
        this.entities_loaded = false;
        if (this.smart_notes)
          this.smart_notes.unload();
        this.smart_notes = null;
        if (this.smart_blocks)
          this.smart_blocks.unload();
        this.smart_blocks = null;
      }
      async reload_entities() {
        this.unload_entities();
        if (this.plugin.is_initializing_entities)
          this.plugin.is_initializing_entities = false;
        await this.init_entities();
      }
      async init() {
        this.init_chat_model();
        DataviewSocket.create(this, 37042);
        this.smart_markdown = new SmartMarkdown({ ...this.config, skip_blocks_with_headings_only: true });
        await this.init_entities();
        await this.init_import();
        await this.init_chat();
      }
      // load one at a time to re-use embed models
      async init_entities() {
        if (this.plugin.is_initializing_entities)
          return console.log("already init entities");
        this.plugin.is_initializing_entities = true;
        if (this.config.embedding_file_per_note) {
          this.smart_notes = new SmartNotes(this);
          this.smart_blocks = new SmartBlocks(this);
          this.smart_notes.merge_defaults();
          this.smart_blocks.merge_defaults();
          await this.smart_blocks.load_smart_embed();
          await this.smart_notes.load();
        } else {
          await Promise.all(Object.values(this.collections).map(async (static_collection) => await static_collection.load(this)));
        }
        this.plugin.is_initializing_entities = false;
        this.entities_loaded = true;
      }
      // initiate import of smart notes, shows notice before starting embedding
      async init_import() {
        if (this.smart_notes.smart_embed || this.smart_blocks.smart_embed)
          this.smart_notes.import(this.files, { reset: true, show_notice: true });
      }
      init_chat_model(chat_model_platform_key = null) {
        var _a, _b;
        let chat_model_config = {};
        chat_model_platform_key = chat_model_platform_key != null ? chat_model_platform_key : this.config.chat_model_platform_key;
        if (chat_model_platform_key === "open_router" && !((_a = this.config[chat_model_platform_key]) == null ? void 0 : _a.api_key))
          chat_model_config.api_key = "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";
        else
          chat_model_config = (_b = this.config[chat_model_platform_key]) != null ? _b : {};
        this.chat_model = new this.chat_classes.ScChatModel(this, chat_model_platform_key, { ...chat_model_config });
        this.chat_model._request_adapter = this.plugin.obsidian.requestUrl;
      }
      async init_chat() {
        var _a;
        this.actions = new this.chat_classes.ScActions(this);
        this.actions.init();
        while (!((_a = this.plugin.chat_view) == null ? void 0 : _a.containerEl))
          await new Promise((r) => setTimeout(r, 300));
        this.chat_ui = new this.chat_classes.ScChatsUI(this, this.plugin.chat_view.containerEl);
        this.chats = new this.chat_classes.ScChats(this);
        await this.chats.load_all();
      }
      get_tfile(file_path) {
        return this.plugin.app.vault.getAbstractFileByPath(file_path);
      }
      async cached_read(file) {
        const t_file = typeof file === "string" ? this.get_tfile(file) : file;
        if (!(t_file instanceof this.plugin.obsidian.TFile))
          return null;
        return await this.plugin.app.vault.cachedRead(t_file);
      }
      async force_refresh() {
        this.smart_blocks.clear();
        this.smart_notes.clear();
        this.smart_notes.import(this.files);
      }
      // prevent saving too often (large files can cause lag)
      save() {
        if (this.save_timeout)
          clearTimeout(this.save_timeout);
        this.save_timeout = setTimeout(async () => {
          if (this.plugin.last_user_activity && Date.now() - this.plugin.last_user_activity < 6e4)
            return this.save();
          await this._save();
          this.save_timeout = null;
        }, 2e4);
      }
      async _save() {
        await Promise.all(Object.keys(this.collections).map(async (collection_name) => await this[collection_name]._save()));
      }
      // getters
      get all_files() {
        return this.plugin.app.vault.getFiles().filter((file) => file instanceof this.plugin.obsidian.TFile && (file.extension === "md" || file.extension === "canvas"));
      }
      // no exclusions
      get files() {
        return this.plugin.app.vault.getFiles().filter((file) => file instanceof this.plugin.obsidian.TFile && (file.extension === "md" || file.extension === "canvas") && this.is_included(file.path));
      }
      is_included(file_path) {
        return !this.file_exclusions.some((exclusion) => file_path.includes(exclusion));
      }
      get file_exclusions() {
        var _a;
        if (this._file_exclusions)
          return this._file_exclusions;
        this._file_exclusions = ((_a = this.plugin.settings.file_exclusions) == null ? void 0 : _a.length) ? this.plugin.settings.file_exclusions.split(",").map((file) => file.trim()) : [];
        return this._file_exclusions = this._file_exclusions.concat(this.folder_exclusions);
      }
      get folder_exclusions() {
        var _a;
        if (this._folder_exclusions)
          return this._folder_exclusions;
        return this._folder_exclusions = ((_a = this.plugin.settings.folder_exclusions) == null ? void 0 : _a.length) ? this.plugin.settings.folder_exclusions.split(",").map((folder) => {
          folder = folder.trim();
          if (folder.slice(-1) !== "/")
            return folder + "/";
          return folder;
        }) : [];
      }
      get excluded_headings() {
        var _a;
        if (this._excluded_headings)
          return this._excluded_headings;
        return this._excluded_headings = ((_a = this.plugin.settings.excluded_headings) == null ? void 0 : _a.length) ? this.plugin.settings.excluded_headings.split(",").map((heading) => heading.trim()) : [];
      }
      get system_prompts() {
        return this.plugin.app.vault.getMarkdownFiles().filter((file) => file.path.includes(this.config.system_prompts_folder) || file.path.includes(".prompt") || file.path.includes(".sp"));
      }
    };
    exports2.ScEnv = ScEnv2;
  }
});

// src/default_settings.js
var require_default_settings = __commonJS({
  "src/default_settings.js"(exports2) {
    function default_settings2() {
      return {
        settings: {
          new_user: true,
          chat_folder: "smart chat",
          smart_notes_embed_model: "TaylorAI/bge-micro-v2",
          smart_blocks_embed_model: "None",
          smart_connections_folder: ".smart-connections",
          smart_connections_folder_last: ".smart-connections",
          system_prompts_folder: "smart prompts",
          smart_chat_folder: "smart-chats",
          smart_chat_folder_last: "smart-chats",
          local_embedding_max_tokens: 2048,
          embedding_file_per_note: false,
          chat_model_platform_key: "open_router",
          open_router: {},
          // Smart Blocks Settings (chunking)
          embed_input_min_chars: 50,
          multi_heading_blocks: true,
          // v2.2
          enable_mobile: true,
          // V1
          api_key: "",
          excluded_headings: "",
          file_exclusions: "Untitled",
          folder_exclusions: "smart-chats",
          show_full_path: false,
          expanded_view: true,
          language: "en",
          log_render: false,
          log_render_files: false,
          recently_sent_retry_notice: false,
          version: ""
          // smart_chat_model: "gpt-3.5-turbo-0125",
          // skip_sections: false, // DEPRECATED
          // group_nearest_by_file: false, // DEPRECATED
          // path_only: "", // DEPRECATED
          // header_exclusions: "", // DEPRECATED use excluded_headings instead
        },
        api: null,
        embeddings_loaded: false,
        folders: [],
        has_new_embeddings: false,
        nearest_cache: {},
        render_log: {
          deleted_embeddings: 0,
          exclusions_logs: {},
          failed_embeddings: [],
          files: [],
          new_embeddings: 0,
          skipped_low_delta: {},
          token_usage: 0,
          tokens_saved_by_cache: 0
        },
        retry_notice_timeout: null,
        save_timeout: null,
        sc_branding: {},
        update_available: false
      };
    }
    exports2.default_settings = default_settings2;
  }
});

// src/smart_embed_settings.js
var require_smart_embed_settings = __commonJS({
  "src/smart_embed_settings.js"(exports2) {
    var { SmartSettings } = require_smart_settings();
    var smart_embed_models = require_models();
    var SmartEmbedSettings = class extends SmartSettings {
      refresh_smart_view() {
        this.plugin.smart_connections_view.render_nearest();
      }
      async connect_to_smart_connect() {
        var _a, _b;
        if ((_b = (_a = this.plugin.env.smart_notes) == null ? void 0 : _a.smart_embed) == null ? void 0 : _b.is_smart_connect) {
          this.plugin.notices.show("smart connect already connected", "Already connected to local Smart Connect for embedding.");
          return;
        }
        try {
          await this.plugin.obsidian.requestUrl({ url: "http://localhost:37421/", method: "GET" });
          this.plugin.notices.show("smart connect found", "Local Smart Connect server found. Connecting...");
          this.plugin.restart_plugin();
        } catch (err) {
          this.plugin.notices.show("smart connect not found", "Could not connect to local Smart Connect server");
        }
      }
      async test_api_key_openai_embeddings() {
        var _a, _b, _c, _d;
        const req = {
          url: `https://api.openai.com/v1/embeddings`,
          method: "POST",
          body: JSON.stringify({ model: "text-embedding-ada-002", input: "test" }),
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.plugin.settings.api_key}` }
        };
        try {
          const resp = await this.plugin.obsidian.requestUrl(req);
          if ((_d = (_c = (_b = (_a = resp == null ? void 0 : resp.json) == null ? void 0 : _a.data) == null ? void 0 : _b[0]) == null ? void 0 : _c.embedding) == null ? void 0 : _d.length) {
            return this.plugin.notices.show("api key test pass", "Success! OpenAI API key is valid");
          }
          this.plugin.notices.show("api key test fail", "Error: OpenAI API key is invalid!");
        } catch (err) {
          this.plugin.notices.show("api key test fail", "Error: OpenAI API key is invalid!");
          console.error("Smart Connections: Error testing OpenAI API key", err);
        }
      }
      reload_env() {
        this.env.reload();
      }
      // DEPRECATED
      restart_plugin() {
        this.plugin.restart_plugin();
      }
      get template() {
        return this.templates["smart_embed_settings"];
      }
      async get_view_data() {
        const view_data = {
          settings: this.plugin.settings,
          embedding_models: Object.keys(smart_embed_models).map((model_key) => ({ key: model_key, ...smart_embed_models[model_key] }))
        };
        view_data.smart_embed_settings = this.ejs.render(this.template, view_data);
        return view_data;
      }
    };
    exports2.SmartEmbedSettings = SmartEmbedSettings;
  }
});

// src/sc_smart_view.js
var require_sc_smart_view = __commonJS({
  "src/sc_smart_view.js"(exports2) {
    var { SmartObsidianView } = require_smart_obsidian_view();
    var { SmartEmbedSettings } = require_smart_embed_settings();
    var SUPPORTED_FILE_TYPES = ["md", "canvas"];
    var ScSmartView2 = class extends SmartObsidianView {
      static get view_type() {
        return "smart-connections-view";
      }
      // Obsidian
      getViewType() {
        return this.constructor.view_type;
      }
      getDisplayText() {
        return "Smart Connections Files";
      }
      getIcon() {
        return "smart-connections";
      }
      async onOpen() {
        this.app.workspace.onLayoutReady(this.initialize.bind(this));
      }
      async initialize() {
        var _a;
        this.brain = this.env;
        await this.wait_for_env_to_load();
        this.last_parent_id = (_a = this.constructor.get_leaf(this.app.workspace)) == null ? void 0 : _a.parent.id;
        this.container = this.containerEl.children[1];
        this.container.empty();
        this.nearest_cache = {};
        this.plugin.smart_connections_view = this;
        this.register_plugin_events();
        this.app.workspace.registerHoverLinkSource(this.constructor.view_type, { display: "Smart Connections Files", defaultMod: true });
        this.container.innerHTML = this.render_template("smart_connections", { current_path: "", results: [] });
        this.add_top_bar_listeners();
      }
      async onClose() {
        console.log("closing smart connections view");
        this.app.workspace.unregisterHoverLinkSource(this.constructor.view_type);
      }
      onResize() {
        if (this.constructor.get_leaf(this.app.workspace).parent.id !== this.last_parent_id) {
          console.log("Parent changed, reloading");
          this.initialize();
        }
      }
      // getters
      // DEPRECATED
      // get path_only() { return (this.settings.path_only?.length) ? this.settings.path_only.split(",").map((path) => path.trim()) : []; }
      // Smart Connections
      register_plugin_events() {
        this.plugin.registerEvent(this.app.workspace.on("file-open", (file) => {
          this.update_last_user_activity_timestamp();
          if (!file)
            return;
          if (this.container.checkVisibility() === false)
            return console.log("View inactive, skipping render nearest");
          this.render_nearest(file);
        }));
        this.plugin.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => {
          var _a;
          this.update_last_user_activity_timestamp();
          if (leaf.view instanceof this.constructor) {
            if (leaf.view.container.querySelectorAll(".search-result").length && leaf.view.last_note === ((_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path))
              return;
            return this.render_nearest();
          }
        }));
        this.plugin.registerEvent(this.app.workspace.on("editor-change", (editor) => {
          this.update_last_user_activity_timestamp();
        }));
        this.plugin.registerEvent(this.app.workspace.on("quit", async () => {
          if (this.env.save_timeout) {
            clearTimeout(this.env.save_timeout);
            await this.env._save();
            console.log("Smart Connections saved");
          }
        }));
      }
      // used in brain.save timeout to reset if recent activity (prevent saving blocking UX during user activity)
      update_last_user_activity_timestamp() {
        this.last_user_activity = Date.now();
      }
      // Smart Connections Views
      get view_context() {
        var _a, _b;
        return {
          ...super.view_context,
          blocks: (_a = this.env.smart_blocks) == null ? void 0 : _a.keys.length,
          notes: (_b = this.env.smart_notes) == null ? void 0 : _b.keys.length
        };
      }
      async render_nearest(context, container = this.container) {
        var _a, _b, _c;
        if (!((_a = this.env) == null ? void 0 : _a.entities_loaded)) {
          container.innerHTML = "Loading Smart Connections...";
          while (!((_b = this.env) == null ? void 0 : _b.entities_loaded))
            await new Promise((r) => setTimeout(r, 2e3));
        }
        let results;
        if (typeof context === "string")
          results = await this.plugin.api.search(context);
        if (typeof context === "undefined")
          context = this.app.workspace.getActiveFile();
        if (context instanceof this.plugin.obsidian.TFile) {
          if (SUPPORTED_FILE_TYPES.indexOf(context.extension) === -1)
            return this.plugin.notices.show("unsupported file type", [
              "File: " + context.name,
              "Unsupported file type (Supported: " + SUPPORTED_FILE_TYPES.join(", ") + ")"
            ]);
          if (!this.env.smart_notes.get(context.path)) {
            if (this.env.is_included(context.path)) {
              await this.env.smart_notes.import(this.env.files);
            } else {
              return this.plugin.notices.show("excluded file", "File is excluded: " + context.path, { timeout: 3e3 });
            }
          }
          results = (_c = this.env.smart_notes.get(context.path)) == null ? void 0 : _c.find_connections();
        }
        if (context instanceof this.env.item_types.SmartBlock)
          results = context.find_connections();
        if (context instanceof this.env.item_types.SmartNote)
          results = context.find_connections();
        if (!results)
          return this.plugin.notices.show("no smart connections found", "No Smart Connections found.");
        if (typeof context === "object")
          context = context.key || context.path;
        this.last_note = this.app.workspace.getActiveFile().path;
        container.innerHTML = this.render_template("smart_connections", { current_path: context, results });
        this.add_top_bar_listeners(container);
        container.querySelectorAll(".search-result").forEach((elm, i) => this.add_link_listeners(elm, results[i]));
        container.querySelectorAll(".search-result:not(.sc-collapsed) ul li").forEach(this.render_result.bind(this));
      }
      async render_result(elm, i = 0) {
        var _a;
        if (elm.innerHTML)
          return console.log("already rendered");
        await new Promise((r) => setTimeout(r, 20 * i));
        if (!isElementVisible(elm)) {
          const parent = elm.closest(".search-result");
          if (parent.classList.contains("sc-collapsed"))
            return;
          if (!isElementVisible(parent)) {
            const observer = new IntersectionObserver((entries, observer2) => {
              if (entries[0].isIntersecting) {
                this.render_result(elm);
                observer2.unobserve(parent);
              }
            }, { threshold: 0.5 });
            observer.observe(parent);
            return;
          }
        }
        console.log("rendering result");
        const entity_key = elm.title;
        const collection_name = elm.dataset.collection;
        const entity = this.brain[collection_name].get(entity_key);
        if (should_render_embed())
          return this.plugin.obsidian.MarkdownRenderer.render(this.app, entity.embed_link, elm, entity_key, new this.plugin.obsidian.Component());
        const content = (_a = await (entity == null ? void 0 : entity.get_content())) == null ? void 0 : _a.replace(/```dataview/g, "```\\dataview");
        if (!entity || !content) {
          elm.createEl("p", { text: "Block not found: " + entity_key });
          const refresh_button = elm.createEl("button", { text: "Refresh embeddings" });
          refresh_button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.env.smart_notes.import(this.env.files, { reset: true });
          });
        }
        this.plugin.obsidian.MarkdownRenderer.render(this.app, content, elm, entity_key, new this.plugin.obsidian.Component());
        function isElementVisible(elem) {
          const rect = elem.getBoundingClientRect();
          return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        }
        function should_render_embed() {
          var _a2, _b;
          if (!entity)
            return false;
          if (entity.is_canvas)
            return true;
          if (entity.is_excalidraw)
            return true;
          if ((_a2 = entity.note) == null ? void 0 : _a2.is_canvas)
            return true;
          if ((_b = entity.note) == null ? void 0 : _b.is_excalidraw)
            return true;
          return false;
        }
      }
      add_link_listeners(elm, item) {
        elm.addEventListener("click", this.handle_search_result_click.bind(this));
        elm.setAttr("draggable", "true");
        elm.addEventListener("dragstart", (event) => {
          const dragManager = this.app.dragManager;
          const file_path = item.path.split("#")[0];
          const file = this.app.metadataCache.getFirstLinkpathDest(file_path, "");
          const dragData = dragManager.dragFile(event, file);
          dragManager.onDragStart(event, dragData);
        });
        if (item.path.indexOf("{") > -1)
          return;
        elm.addEventListener("mouseover", (event) => {
          this.app.workspace.trigger("hover-link", {
            event,
            source: this.constructor.view_type,
            hoverParent: elm.parentElement,
            targetEl: elm,
            linktext: item.path
          });
        });
      }
      handle_search_result_click(event) {
        event.preventDefault();
        event.stopPropagation();
        const search_result = event.target.classList.contains(".search-result") ? event.target : event.target.closest(".search-result");
        if (event.target instanceof SVGElement)
          return this.toggle_search_result_visibility(search_result);
        if (search_result.classList.contains("sc-collapsed")) {
          if (this.plugin.obsidian.Keymap.isModEvent(event))
            this.plugin.open_note(search_result.dataset.path, event);
          else
            this.toggle_search_result_visibility(search_result);
        } else
          this.plugin.open_note(search_result.dataset.path, event);
      }
      toggle_search_result_visibility(search_result_elm) {
        search_result_elm.classList.toggle("sc-collapsed");
        this.render_result(search_result_elm.querySelector("li"));
      }
      add_top_bar_listeners(container = this.container) {
        const top_bar = container.querySelector(".sc-top-bar");
        const search_button = container.querySelector(".sc-search-button");
        search_button.addEventListener("click", () => {
          const og_top_bar = top_bar.innerHTML;
          top_bar.empty();
          const search_container = top_bar.createEl("div", { cls: "search-input-container" });
          const input = search_container.createEl("input", {
            cls: "sc-search-input",
            type: "search",
            placeholder: "Type to start search..."
          });
          input.focus();
          input.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              if (this.search_timeout)
                clearTimeout(this.search_timeout);
              top_bar.innerHTML = og_top_bar;
              this.add_top_bar_listeners(container);
            }
          });
          input.addEventListener("keyup", (event) => {
            if (this.search_timeout)
              clearTimeout(this.search_timeout);
            const search_term = input.value;
            if (event.key === "Enter" && search_term !== "")
              this.render_nearest(search_term);
            else if (search_term !== "") {
              if (this.search_timeout)
                clearTimeout(this.search_timeout);
              this.search_timeout = setTimeout(() => this.render_nearest(search_term), 700);
            }
          });
        });
        const fold_all_button = container.querySelector(".sc-fold-all");
        fold_all_button.addEventListener("click", (e) => {
          container.querySelectorAll(".search-result").forEach((elm) => elm.classList.add("sc-collapsed"));
          this.plugin.settings.expanded_view = false;
          this.plugin.save_settings();
        });
        const unfold_all_button = container.querySelector(".sc-unfold-all");
        unfold_all_button.addEventListener("click", () => {
          container.querySelectorAll(".search-result").forEach((elm) => {
            elm.classList.remove("sc-collapsed");
            this.render_result(elm.querySelector("li"));
          });
          this.plugin.settings.expanded_view = true;
          this.plugin.save_settings();
        });
        const settings_btn = this.container.querySelector("button[title='Settings']");
        settings_btn.addEventListener("click", async () => {
          const settings_container = this.container.querySelector("#settings");
          if (settings_container.innerHTML)
            return settings_container.innerHTML = "";
          if (!this.embed_settings)
            this.embed_settings = new SmartEmbedSettings(this.env, settings_container);
          else
            this.embed_settings.container = settings_container;
          this.embed_settings.render();
          settings_container.style.transition = "background-color 0.5s ease-in-out";
          settings_container.style.backgroundColor = "var(--bold-color)";
          setTimeout(() => {
            settings_container.style.backgroundColor = "";
          }, 500);
        });
      }
    };
    exports2.ScSmartView = ScSmartView2;
  }
});

// src/smart_search.js
var require_smart_search = __commonJS({
  "src/smart_search.js"(exports2) {
    var SmartSearch2 = class {
      constructor(plugin) {
        this.main = plugin;
        this.plugin = plugin;
      }
      async search(search_text, filter = {}) {
        var _a, _b, _c, _d, _e, _f;
        try {
          if (!((_b = (_a = this.plugin.env) == null ? void 0 : _a.smart_blocks) == null ? void 0 : _b.smart_embed) && !((_d = (_c = this.plugin.env) == null ? void 0 : _c.smart_notes) == null ? void 0 : _d.smart_embed)) {
            this.plugin.notices.show("embed model not loaded", "Embed model not loaded. Please wait for the model to load and try again.");
            return [];
          }
          const collection = ((_f = (_e = this.plugin.env) == null ? void 0 : _e.smart_blocks) == null ? void 0 : _f.smart_embed) ? this.plugin.env.smart_blocks : this.plugin.env.smart_notes;
          const embedding = await collection.smart_embed.embed(search_text);
          if (!(embedding == null ? void 0 : embedding.vec)) {
            this.main.notices.show("embed search text failed", "Failed to embed search text.");
            return [];
          }
          return collection.nearest(embedding.vec, filter).sort((a, b) => {
            if (a.sim > b.sim)
              return -1;
            if (a.sim < b.sim)
              return 1;
            return 0;
          });
        } catch (e) {
          this.main.notices.show("error in embedding search", "Error in embedding search. See console for details.", { timeout: 0 });
          console.error(e);
          return [];
        }
      }
    };
    exports2.SmartSearch = SmartSearch2;
  }
});

// src/smart_notices.js
var require_smart_notices = __commonJS({
  "src/smart_notices.js"(exports2) {
    var { setIcon } = require("obsidian");
    var SmartNotices2 = class {
      constructor(main) {
        this.main = main;
        this.active = {};
      }
      show(id, message, opts = {}) {
        var _a, _b;
        if (typeof opts.timeout === "undefined")
          opts.timeout = 5e3;
        if ((_a = this.main.settings.muted_notices) == null ? void 0 : _a[id]) {
          if (opts.confirm && typeof opts.confirm.callback === "function")
            opts.confirm.callback.call();
          return;
        }
        const content = this.build(id, message, opts);
        if (this.active[id] && ((_b = this.active[id].noticeEl) == null ? void 0 : _b.parentElement)) {
          return this.active[id].setMessage(content, opts.timeout);
        }
        return this.render(id, content, opts);
      }
      render(id, content, opts) {
        this.active[id] = new this.main.obsidian.Notice(content, opts.timeout);
        return this.active[id];
      }
      build(id, message, opts = {}) {
        const frag = document.createDocumentFragment();
        const head = frag.createEl("p", { cls: "sc-notice-head", text: "[Smart Connections]" });
        const content = frag.createEl("p", { cls: "sc-notice-content" });
        const actions = frag.createEl("div", { cls: "sc-notice-actions" });
        if (typeof message === "string")
          content.innerText = message;
        else if (Array.isArray(message))
          content.innerHTML = message.join("<br>");
        if (!opts.immutable)
          this.add_mute_btn(id, actions);
        if (opts.confirm)
          this.add_btn(opts.confirm, actions);
        if (opts.button)
          this.add_btn(opts.button, actions);
        return frag;
      }
      add_btn(button, container) {
        const btn = document.createElement("button");
        btn.innerHTML = button.text;
        btn.addEventListener("click", (e) => {
          if (button.stay_open) {
            e.preventDefault();
            e.stopPropagation();
          }
          button.callback();
        });
        container.appendChild(btn);
      }
      add_mute_btn(id, container) {
        const btn = document.createElement("button");
        setIcon(btn, "bell-off");
        btn.addEventListener("click", () => {
          if (!this.main.settings.muted_notices)
            this.main.settings.muted_notices = {};
          this.main.settings.muted_notices[id] = true;
          this.main.save_settings();
          this.show("Notice muted", "Notice muted", { timeout: 2e3 });
        });
        container.appendChild(btn);
      }
      unload() {
        for (let id in this.active) {
          this.remove(id);
        }
      }
      remove(id) {
        var _a;
        (_a = this.active[id]) == null ? void 0 : _a.hide();
        delete this.active[id];
      }
      // begin plugin specific methods
      show_requires_smart_view() {
        const btn = { text: "Open Smart View", callback: () => {
          this.main.open_view(false);
        } };
        const msg = 'Smart View must be open to utilize all Smart Chat features. For example, asking things like "Based on my notes..." requires Smart View to be open.';
        this.show("requires smart view", msg, { button: btn, timeout: 0 });
      }
    };
    exports2.SmartNotices = SmartNotices2;
  }
});

// src/sc_settings.js
var require_sc_settings = __commonJS({
  "src/sc_settings.js"(exports2) {
    var { SmartSettings } = require_smart_settings();
    var smart_embed_models = require_models();
    var { SmartChatSettings } = require_smart_chat_settings();
    var { SmartEmbedSettings } = require_smart_embed_settings();
    var ScSettings2 = class extends SmartSettings {
      constructor(env, container, template_name = "smart_settings") {
        super(env, container, template_name);
        this.chat_settings = new SmartChatSettings(env, container, template_name);
        this.embed_settings = new SmartEmbedSettings(env, container, template_name);
      }
      update_smart_chat_folder() {
        this.chat_settings.update_smart_chat_folder();
      }
      async changed_smart_chat_model() {
        await this.chat_settings.changed_smart_chat_model(false);
        this.render();
      }
      async test_chat_api_key() {
        await this.chat_settings.test_chat_api_key();
      }
      get self_ref_list() {
        return this.chat_settings.self_ref_list;
      }
      async refresh_notes() {
        this.env.smart_notes.import(this.env.files, { reset: true });
      }
      reload_env() {
        this.env.reload();
      }
      // DEPRECATED
      restart_plugin() {
        this.plugin.restart_plugin();
      }
      force_refresh() {
        this.env.force_refresh();
      }
      sync_for_chatgpt() {
        this.plugin.sync_notes();
      }
      update_smart_connections_folder() {
        this.plugin.update_smart_connections_folder();
      }
      refresh_smart_view() {
        this.embed_settings.refresh_smart_view();
      }
      async connect_to_smart_connect() {
        await this.embed_settings.connect_to_smart_connect();
      }
      // test API key
      async test_api_key_openai_embeddings() {
        await this.embed_settings.test_api_key_openai_embeddings();
      }
      async exclude_all_top_level_folders() {
        const folders = (await this.app.vault.adapter.list("/")).folders;
        const input = this.container.querySelector("div[data-setting='folder_exclusions'] input");
        input.value = folders.join(", ");
        input.dispatchEvent(new Event("input"));
        this.update_exclusions();
      }
      async update_language(setting, value, elm) {
        await this.update("language", value);
        const self_ref_pronouns_list = this.container.querySelector("#self-referential-pronouns");
        self_ref_pronouns_list.setText(this.self_ref_list);
      }
      async update_exclusions() {
        this.plugin.env._file_exclusions = null;
        this.plugin.env._folder_exclusions = null;
        console.log("render_file_counts");
        const elm = this.container.querySelector("#file-counts");
        console.log("elm", elm);
        const total_files = this.plugin.env.all_files.length;
        const included_files = this.plugin.env.files.length;
        elm.setText(`Included files: ${included_files} / Total files: ${total_files}`);
      }
      get template() {
        return this.templates["smart_settings"];
      }
      async get_view_data() {
        const view_data = {
          settings: this.plugin.settings,
          embedding_models: Object.keys(smart_embed_models).map((model_key) => ({ key: model_key, ...smart_embed_models[model_key] })),
          included_files: this.plugin.env.files.length,
          total_files: this.plugin.env.all_files.length,
          muted_notices: this.plugin.settings.muted_notices || false,
          ...await this.chat_settings.get_view_data() || {},
          ...await this.embed_settings.get_view_data() || {}
        };
        return view_data;
      }
      unmute_notice(setting) {
        const id = setting.split(".")[1];
        console.log("unmute_notice", id);
        delete this.plugin.settings.muted_notices[id];
        this.update("muted_notices", this.plugin.settings.muted_notices);
        this.render();
      }
      // upgrade to early access
      async upgrade_to_early_access() {
        await this.plugin.update_early_access();
      }
    };
    exports2.ScSettings = ScSettings2;
  }
});

// src/sc_settings_tab.js
var require_sc_settings_tab = __commonJS({
  "src/sc_settings_tab.js"(exports2) {
    var { PluginSettingTab } = require("obsidian");
    var ScSettingsTab2 = class extends PluginSettingTab {
      constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.config = plugin.settings;
      }
      display() {
        this.smart_settings = new this.plugin.ScSettings(this.plugin.env, this.containerEl);
        return this.smart_settings.render();
      }
    };
    exports2.ScSettingsTab = ScSettingsTab2;
  }
});

// src/sc_actions_ux.js
var require_sc_actions_ux = __commonJS({
  "src/sc_actions_ux.js"(exports2) {
    var ejs = require_ejs_min();
    var views = require_views();
    var ScActionsUx2 = class {
      constructor(plugin, container) {
        this.plugin = plugin;
        this.container = container;
      }
      change_code_block(code) {
        const active_file = this.plugin.app.workspace.getActiveFile();
        const note_path = active_file.path;
        const old_content = code.substring(code.indexOf("<<<<<<< ORIGINAL\n") + "<<<<<<< ORIGINAL\n".length, code.indexOf("======="));
        const new_content = code.substring(code.indexOf("=======\n") + "=======\n".length, code.indexOf(">>>>>>>"));
        const time_saved = (Math.round(new_content.split(" ").length / 50) || 1) + " min";
        this.container.innerHTML = this.render_template("sc_change", { new_content, old_content, time_saved });
        console.log(this.container);
        const new_content_container = this.container.querySelector(".new-content");
        const old_content_container = this.container.querySelector(".old-content");
        this.plugin.obsidian.MarkdownRenderer.renderMarkdown(new_content, new_content_container, note_path, new this.plugin.obsidian.Component());
        this.plugin.obsidian.MarkdownRenderer.renderMarkdown(old_content, old_content_container, note_path, new this.plugin.obsidian.Component());
        const approve_button = this.get_button_by_text("Accept");
        approve_button.onclick = async () => {
          const content = await this.plugin.app.vault.cachedRead(active_file);
          const updated_content = content.replace("```sc-change\n" + code + "\n```", new_content.trim());
          await this.plugin.app.vault.modify(active_file, updated_content);
          await this.append_accepted_changes({ note_path, old_content, new_content, time_saved });
        };
        const reject_button = this.get_button_by_text("Reject");
        reject_button.onclick = async () => {
          const content = await this.plugin.app.vault.cachedRead(active_file);
          const updated_content = content.replace("```sc-change\n" + code + "\n```", old_content.trim());
          await this.plugin.app.vault.modify(active_file, updated_content);
        };
      }
      async append_accepted_changes(change) {
        const file_path = this.plugin.settings.smart_connections_folder + "/accepted_changes.ndjson";
        if (!await this.plugin.app.vault.exists(file_path)) {
          console.log("File does not exist, creating it");
          await this.plugin.app.vault.create(file_path, "");
        }
        await this.plugin.app.vault.adapter.append(file_path, JSON.stringify(change) + "\n");
      }
      render_template(template_name, data) {
        if (!views[template_name])
          throw new Error(`Template '${template_name}' not found.`);
        return ejs.render(views[template_name], data, { context: this });
      }
      get_button_by_text(text) {
        return get_button_by_text(this.container, text);
      }
      get_icon(name) {
        return this.plugin.obsidian.getIcon(name).outerHTML;
      }
      get attribution() {
        return views.attribution;
      }
    };
    function get_button_by_text(container, text) {
      return Array.from(container.querySelectorAll("button")).find((button) => button.textContent === text);
    }
    exports2.ScActionsUx = ScActionsUx2;
  }
});

// src/open_note.js
var require_open_note = __commonJS({
  "src/open_note.js"(exports2) {
    async function open_note2(plugin, target_path, event = null) {
      let targetFile;
      let heading;
      if (target_path[target_path.length - 1] === "#")
        target_path = target_path.slice(0, -1);
      if (target_path.indexOf("#") > -1) {
        targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path.split("#")[0], "");
        const target_file_cache = plugin.app.metadataCache.getFileCache(targetFile);
        let heading_text = target_path.split("#").pop();
        let occurence = 0;
        if (heading_text.indexOf("{") > -1) {
          occurence = parseInt(heading_text.split("{")[1].split("}")[0]);
          heading_text = heading_text.split("{")[0];
        }
        const headings = target_file_cache.headings;
        for (let i = 0; i < headings.length; i++) {
          if (headings[i].heading === heading_text) {
            if (occurence === 0) {
              heading = headings[i];
              break;
            }
            occurence--;
          }
        }
      } else {
        targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path, "");
      }
      let leaf;
      if (event) {
        const mod = plugin.obsidian.Keymap.isModEvent(event);
        leaf = plugin.app.workspace.getLeaf(mod);
      } else {
        leaf = plugin.app.workspace.getMostRecentLeaf();
      }
      await leaf.openFile(targetFile);
      if (heading) {
        let { editor } = leaf.view;
        const pos = { line: heading.position.start.line, ch: 0 };
        editor.setCursor(pos);
        editor.scrollIntoView({ to: pos, from: pos }, true);
      }
    }
    exports2.open_note = open_note2;
  }
});

// src/index.js
var {
  addIcon,
  Keymap,
  MarkdownRenderer,
  Notice,
  Plugin,
  request,
  requestUrl,
  TAbstractFile,
  TFile
} = require("obsidian");
var { ObsAJSON } = require_ObsAJSON();
var { ObsMultiAJSON } = require_ObsMultiAJSON();
var { ScEnv } = require_sc_env();
var { default_settings } = require_default_settings();
var { ScSmartView } = require_sc_smart_view();
var { SmartSearch } = require_smart_search();
var { SmartNotices } = require_smart_notices();
var { ScChatView } = require_sc_chat_view();
var { ScSettings } = require_sc_settings();
var { ScSettingsTab } = require_sc_settings_tab();
var embed_models = require_models();
var { ScActionsUx } = require_sc_actions_ux();
var { open_note } = require_open_note();
var SmartConnectionsPlugin = class extends Plugin {
  static get defaults() {
    return default_settings();
  }
  get item_views() {
    return {
      ScSmartView,
      ScChatView
    };
  }
  get ScSettings() {
    return ScSettings;
  }
  async open_note(target_path, event = null) {
    await open_note(this, target_path, event);
  }
  async load_settings() {
    Object.assign(this, this.constructor.defaults);
    Object.assign(this.settings, await this.loadData());
    this.handle_deprecated_settings();
  }
  async onload() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  // initialize when layout is ready
  onunload() {
    var _a, _b;
    console.log("unloading plugin");
    (_a = this.env) == null ? void 0 : _a.unload();
    this.env = null;
    this.brain = null;
    (_b = this.notices) == null ? void 0 : _b.unload();
  }
  async initialize() {
    this.obsidian = require("obsidian");
    this.notices = new SmartNotices(this);
    console.log("Loading Smart Connections v2...");
    await this.load_settings();
    this.smart_connections_view = null;
    this.add_commands();
    this.register_views();
    this.addSettingTab(new ScSettingsTab(this.app, this, "smart_settings_21"));
    await this.check_for_updates();
    this.add_to_gitignore("\n\n# Ignore Smart Connections folder\n.smart-connections");
    this.api = new SmartSearch(this);
    (window["SmartSearch"] = this.api) && this.register(() => delete window["SmartSearch"]);
    addIcon("smart-connections", `<path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"/>
    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"/>
    <circle cx="50" cy="20" r="9" fill="currentColor"/>
    <circle cx="80" cy="40" r="9" fill="currentColor"/>
    <circle cx="80" cy="70" r="9" fill="currentColor"/>
    <circle cx="50" cy="100" r="9" fill="currentColor"/>
    <circle cx="30" cy="50" r="9" fill="currentColor"/>`);
    this.addRibbonIcon("smart-connections", "Open: View Smart Connections", () => {
      this.open_view();
    });
    this.addRibbonIcon("message-square", "Open: Smart Chat Conversation", () => {
      this.open_chat();
    });
    this.registerMarkdownCodeBlockProcessor("smart-connections", this.render_code_block.bind(this));
    this.registerMarkdownCodeBlockProcessor("sc-context", this.render_code_block_context.bind(this));
    this.registerMarkdownCodeBlockProcessor("sc-change", this.change_code_block.bind(this));
    this.new_user();
    await this.load_env();
    console.log("Smart Connections v2 loaded");
  }
  async load_env() {
    this.env = new ScEnv(this, this.settings.embedding_file_per_note ? ObsMultiAJSON : ObsAJSON);
    this.brain = this.env;
    await this.env.init();
  }
  new_user() {
    if (!this.settings.new_user)
      return;
    this.settings.new_user = false;
    this.settings.version = this.manifest.version;
    this.open_view();
    this.open_chat();
    if (this.app.workspace.rightSplit.collapsed)
      this.app.workspace.rightSplit.toggle();
    this.save_settings();
  }
  register_views() {
    Object.values(this.item_views).forEach((View) => {
      this.registerView(View.view_type, (leaf) => new View(leaf, this));
    });
  }
  async check_for_updates() {
    if (this.settings.version !== this.manifest.version) {
      this.settings.version = this.manifest.version;
      await this.save_settings();
    }
    setTimeout(this.check_for_update.bind(this), 3e3);
    setInterval(this.check_for_update.bind(this), 108e5);
  }
  // check for update
  async check_for_update() {
    try {
      const { json: response } = await requestUrl({
        url: "https://api.github.com/repos/brianpetro/obsidian-smart-connections/releases/latest",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        contentType: "application/json"
      });
      const latest_release = response.tag_name;
      if (latest_release !== this.manifest.version) {
        new Notice(`[Smart Connections] A new version is available! (v${latest_release})`);
        this.update_available = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async restart_plugin() {
    await this.saveData(this.settings);
    await new Promise((r) => setTimeout(r, 3e3));
    window.restart_plugin = async (id) => {
      console.log("restarting plugin", id);
      await window.app.plugins.disablePlugin(id);
      await window.app.plugins.enablePlugin(id);
      console.log("plugin restarted", id);
    };
    await window.restart_plugin(this.manifest.id);
  }
  add_commands() {
    this.addCommand({
      id: "sc-find-notes",
      name: "Find: Make Smart Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: (editor) => {
        var _a;
        if (editor.somethingSelected())
          this.view.render_nearest(editor.getSelection());
        else if ((_a = editor.getCursor()) == null ? void 0 : _a.line) {
          const line = editor.getCursor().line;
          const block = this.brain.smart_notes.current_note.get_block_by_line(line);
          console.log(block);
          console.log(line);
          this.view.render_nearest(block);
        } else
          this.view.render_nearest();
      }
    });
    this.addCommand({
      id: "sc-refresh-connections",
      name: "Refresh & Make Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: async (editor) => {
        var _a;
        const curr_file = this.app.workspace.getActiveFile();
        (_a = this.view) == null ? true : delete _a.nearest_cache[curr_file.path];
        this.env.smart_notes.delete(curr_file.path);
        await this.env.smart_notes.import([curr_file]);
        setTimeout(() => {
          this.view.render_nearest();
        }, 1e3);
      }
    });
    this.addCommand({
      id: "smart-connections-view",
      name: "Open: View Smart Connections",
      callback: () => {
        this.open_view();
      }
    });
    this.addCommand({
      id: "smart-connections-chat",
      name: "Open: Smart Chat Conversation",
      callback: () => {
        this.open_chat();
      }
    });
    this.addCommand({
      id: "smart-connections-random",
      name: "Open: Random Note from Smart Connections",
      callback: () => {
        var _a;
        const curr_file = this.app.workspace.getActiveFile();
        const curr_note = (_a = this.brain) == null ? void 0 : _a.smart_notes.get(curr_file.path);
        const nearest = curr_note.find_connections();
        const rand = Math.floor(Math.random() * nearest.length / 2);
        const rand_entity = nearest[rand];
        this.open_note(rand_entity.path);
      }
    });
  }
  async make_connections(selected_text = null) {
    if (!this.view)
      await this.open_view();
    await this.view.render_nearest(selected_text);
  }
  async save_settings(rerender = false) {
    await this.saveData(this.settings);
    await this.load_settings();
    if (rerender) {
      this.nearest_cache = {};
      console.log("rerendering view");
      await this.make_connections();
    }
  }
  // utils
  async add_to_gitignore(ignore, message = null) {
    if (!await this.app.vault.adapter.exists(".gitignore"))
      return;
    let gitignore_file = await this.app.vault.adapter.read(".gitignore");
    if (gitignore_file.indexOf(ignore) < 0) {
      await this.app.vault.adapter.append(".gitignore", `

${message ? "# " + message + "\n" : ""}${ignore}`);
      console.log("Added to .gitignore: " + ignore);
    }
  }
  show_notice(message, opts = {}) {
    console.log("old showing notice");
    const notice_id = typeof message === "string" ? message : message[0];
    return this.notices.show(notice_id, message, opts);
  }
  open_view(active = true) {
    ScSmartView.open(this.app.workspace, active);
  }
  open_chat() {
    ScChatView.open(this.app.workspace);
  }
  get view() {
    return ScSmartView.get_view(this.app.workspace);
  }
  get chat_view() {
    return ScChatView.get_view(this.app.workspace);
  }
  // get folders, traverse non-hidden sub-folders
  async get_folders(path = "/") {
    try {
      const folders = (await this.app.vault.adapter.list(path)).folders;
      let folder_list = [];
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].startsWith("."))
          continue;
        folder_list.push(folders[i]);
        folder_list = folder_list.concat(await this.get_folders(folders[i] + "/"));
      }
      return folder_list;
    } catch (error) {
      console.warn("Error getting folders", error);
      return [];
    }
  }
  // SUPPORTERS
  async sync_notes() {
    if (!this.settings.license_key) {
      new Notice("Smart Connections: Supporter license key is required to sync notes to the ChatGPT Plugin server.");
      return;
    }
    console.log("syncing notes");
    const files = this.brain.files;
    const notes = await this.build_notes_object(files);
    const response = await requestUrl({
      url: "https://sync.smartconnections.app/sync",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      contentType: "application/json",
      body: JSON.stringify({
        license_key: this.settings.license_key,
        notes
      })
    });
    console.log(response);
  }
  async build_notes_object(files) {
    let output = {};
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let parts = file.path.split("/");
      let current = output;
      for (let ii = 0; ii < parts.length; ii++) {
        let part = parts[ii];
        if (ii === parts.length - 1) {
          current[part] = await this.app.vault.cachedRead(file);
        } else {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      }
    }
    return output;
  }
  async render_code_block(contents, container, ctx) {
    console.log(container);
    return this.view.render_nearest(contents.trim().length ? contents : ctx.sourcePath, container);
  }
  async render_code_block_context(results, container, ctx) {
    results = this.get_entities_from_context_codeblock(results);
    console.log(results);
    container.innerHTML = this.view.render_template("smart_connections", { current_path: "context", results });
    container.querySelectorAll(".search-result").forEach((elm, i) => this.view.add_link_listeners(elm, results[i]));
    container.querySelectorAll(".search-result:not(.sc-collapsed) ul li").forEach(this.view.render_result.bind(this.view));
  }
  get_entities_from_context_codeblock(results) {
    return results.split("\n").map((key) => {
      const entity = key.includes("#") ? this.brain.smart_blocks.get(key) : this.brain.smart_notes.get(key);
      return entity ? entity : { name: "Not found: " + key };
    });
  }
  // change code block
  async change_code_block(source, el, ctx) {
    console.log(source);
    const renderer = new ScActionsUx(this, el);
    renderer.change_code_block(source);
  }
  // update smart connections folder
  async update_smart_connections_folder() {
    if (this.settings.smart_connections_folder === this.settings.smart_connections_folder_last)
      return;
    if (!confirm("Are you sure you want to update the Smart Connections folder? This will move all Smart Connections files to the new folder and restart the plugin.")) {
      this.settings.smart_connections_folder = this.settings.smart_connections_folder_last;
      return;
    }
    await this.app.vault.adapter.rename(this.settings.smart_connections_folder_last, this.settings.smart_connections_folder);
    this.settings.smart_connections_folder_last = this.settings.smart_connections_folder;
    await this.save_settings();
    this.restart_plugin();
  }
  // update smart chat folder
  async update_smart_chat_folder() {
    if (this.settings.smart_chat_folder === this.settings.smart_chat_folder_last)
      return;
    if (!confirm("Are you sure you want to update the Smart Chats folder? This will move all Smart Chat files to the new folder.")) {
      this.settings.smart_chat_folder = this.settings.smart_chat_folder_last;
      return;
    }
    await this.app.vault.adapter.rename(this.settings.smart_chat_folder_last, this.settings.smart_chat_folder);
    this.settings.smart_chat_folder_last = this.settings.smart_chat_folder;
    await this.save_settings();
    this.env.chats.folder = this.settings.smart_chat_folder;
  }
  async update_early_access() {
    if (!this.settings.license_key)
      return this.show_notice("Supporter license key required for early access update");
    const v2 = await this.obsidian.requestUrl({
      url: "https://sync.smartconnections.app/download_v2",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key: this.settings.license_key
      })
    });
    if (v2.status !== 200)
      return console.error("Error downloading early access update", v2);
    console.log(v2.json);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/main.js", v2.json.main);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/manifest.json", v2.json.manifest);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/styles.css", v2.json.styles);
    await window.app.plugins.loadManifests();
    await this.restart_plugin();
  }
  // BEGIN BACKWARD COMPATIBILITY (DEPRECATED: remove before 2.2 stable release)
  async handle_deprecated_settings() {
    Object.entries(this.settings).forEach(([key, value]) => {
      var _a;
      if (key.includes("-")) {
        const new_key = key.replace(/-/g, "_");
        this.settings[new_key] = value;
        delete this.settings[key];
        this.save_settings();
      }
      if (key.startsWith("api_key_")) {
        const platform = key.replace(/^api_key_/, "");
        if (!this.settings[platform])
          this.settings[platform] = {};
        if (!this.settings[platform].api_key)
          this.settings[platform].api_key = value;
        if ((_a = this.settings.smart_chat_model) == null ? void 0 : _a.startsWith(platform)) {
          const model_name = this.settings.smart_chat_model.replace(platform + "-", "");
          if (!this.settings[platform].model_name)
            this.settings[platform].model_name = model_name;
          delete this.settings.smart_chat_model;
        }
        delete this.settings[key];
        this.save_settings();
      }
    });
    if (!this.settings.file_exclusions.includes("Untitled")) {
      if (this.settings.file_exclusions.length)
        this.settings.file_exclusions += ",";
      this.settings.file_exclusions += "Untitled";
      this.save_settings();
    }
    if (this.settings.smart_notes_embed_model === "None") {
      this.settings.smart_notes_embed_model = "TaylorAI/bge-micro-v2";
      this.save_settings();
    }
    if (!embed_models[this.settings.smart_notes_embed_model]) {
      this.settings.smart_notes_embed_model = this.constructor.defaults.smart_notes_embed_model;
      this.save_settings();
    }
    if (!embed_models[this.settings.smart_blocks_embed_model] && this.settings.smart_blocks_embed_model !== "None") {
      this.settings.smart_blocks_embed_model = this.constructor.defaults.smart_blocks_embed_model;
      this.save_settings();
    }
    if (this.settings.header_exclusions) {
      this.settings.excluded_headings = this.settings.header_exclusions;
      delete this.settings.header_exclusions;
    }
  }
};
module.exports = SmartConnectionsPlugin;