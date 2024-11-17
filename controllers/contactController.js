
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

const getcontacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching contacts." });
    }
};


const createcontact = async (req , res) => {
    const curr_user = req.user;

    try {
        // Check for existing contact by email or phone
        const existingContact = await Contact.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });

        if (existingContact) {
            return res.status(400).json({ message: "Contact with this email or phone number already exists." });
        }
        

        // Create a new contact
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            user_id:curr_user.id
        });

        // Save the new contact to the database
        await newContact.save();

        // Respond with the created contact
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updatecontacts = async (req, res) => {
    const curr_user = req.user; // Assuming user information is correctly set in req.user

    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "No contact with this id." });
        }

        if (contact.user_id !== curr_user.id) {
            return res.status(403).json({ message: "User ID is not valid" }); // Use 403 Forbidden for unauthorized access
        }

        // Proceed to update the contact
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(updatedContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const getcontact = async (req, res) => {
    const curr_user = req.user;

    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "No contact with this id." });
        }

        if (contact.user_id !== curr_user.id) {
            return res.status(403).json({ message: "User ID is not valid" }); // Use 403 Forbidden for unauthorized access
        }

        return res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const deletecontacts = async (req, res) => {
    const curr_user = req.user;

    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "No contact with this id." });
        }

        if (contact.user_id !== curr_user.id) {
            return res.status(403).json({ message: "User ID is not valid" }); // Use 403 Forbidden for unauthorized access
        }

        await Contact.findByIdAndDelete(req.params.id);
        
        return res.status(200).json({ message: "Contact deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports={
    getcontacts,
    createcontact,
    updatecontacts,
    getcontact,
    deletecontacts
};
