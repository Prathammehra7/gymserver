const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const razorpay = require('razorpay');
const authFile = require("../Service/authentication")














