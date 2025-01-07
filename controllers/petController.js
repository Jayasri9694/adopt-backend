const Pet = require('../models/Pet');

exports.addPet = async (req, res) => {
  const { name, age, breed, description, imageUrl } = req.body;

  if (!name || !age || !breed || !description || !imageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPet = new Pet({ name, age, breed, description, imageUrl });
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully!", pet: newPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet updated successfully', pet });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update pet' });
  }
};

exports.listPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve pets' });
  }
};