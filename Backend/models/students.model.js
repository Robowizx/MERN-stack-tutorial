const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    usn:{
        type: String,
        required:[true,'Unique ID is required'],
        validate:{
            validator: (v)=>{
                return /1SK1[5789](CS|EC|CV|TX)([0-9]){3}/.test(v);
            },
            message: props=>{ return `${props.value} is not a valid USN`;}
        }
    },
    name:{
        type: String,
        required: [true,'Name is required'],
        minlength: 3,
        trim: true
    },
    branch:{
        type: String,
        required: [true,'Branch is required'],
        validate:{
            validator: (v)=>{
                return /(CSE|ECE|CIV|TEX)/.test(v);
            },
            message: props=>{return `${props.value} is not a valid branch`;}
        }
    },
    sem: {
        type: Number,
        required:[true,'semster required'],
        max:[8,'8 is the maximum value for semester'],
        min:[1,'1 is the minimum value for semester']
    },
    phno:{
        type: String,
        required: [true ,'phno is required'],
        validate:{
            validator: (v)=>{
                return /([0-9]){10}/.test(v);
            },
            message: props=>{
                return `${props.value} is not a valid phno`;}
        },
        minlength: [10,'invalid phno'],
        maxlength: [10,'invalid phno']
    }
});

const student = mongoose.model('student',studentSchema);

module.exports = student;