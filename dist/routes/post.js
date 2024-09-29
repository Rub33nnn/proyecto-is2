"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const routerpost = (0, express_1.Router)();
routerpost.get('/', post_1.getPosts);
routerpost.get('/:id', post_1.getPostsbyUser);
routerpost.post('/', post_1.addPost);
exports.default = routerpost;
