const { sendSecretCode } = require("../middlewares/Verification");
const { Vendor } = require("../models");

// HELPER METHOD TO GENERATE RANDOM STRINGS
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const vendorController = {
  getVendors: async (req, res) => {
    try {
      const vendors = await Vendor.findAll();
      if (!vendors || vendors.length === 0) {
        return res.status(404).send({ error: "No Vendors Found" });
      } else {
        return res.status(200).json(vendors);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  getVendorById: async (req, res) => {
    const { id } = req.params;
    try {
      const vendor = await Vendor.findByPk(id);
      if (!vendor) {
        return res.status(404).send({ error: "Vendor not found" });
      } else {
        return res.status(200).json(vendor);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  createVendor: async (req, res) => {
    const { companyEmail } = req.body;

    try {
      // const newVendor = await Vendor.create({
      //   kraPin: "N/A",
      //   businessName: "N/A",
      //   kraPin: "N/A",
      //   secretCode:
      //   kraPin: "N/A",
      //   tradingLicense: "N/A",
      //   kraPin: "N/A",
      //   companyAddress: "N/A",
      //   kraPin: "N/A",
      //   streetAddress: "N/A",
      //   kraPin: "N/A",
      //   city: "N/A",
      //   kraPin: "N/A",
      //   phoneNumber: "N/A",
      //   companyEmail,
      //   kraPin: "N/A",
      //   website: "N/A",
      //   kraPin: "N/A",
      //   serviceDetails: "N/A",
      // });
      const randomString = generateRandomString(20);

      sendSecretCode({
        email: companyEmail,
        secretCode: `http://localhost:3000/${randomString}`,
      });

      console.log("Send mails");
      return res.status(201).json("newVendor");
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  updateVendor: async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const vendor = await Vendor.findByPk(id);
      if (!vendor) {
        return res.status(404).send({ error: "Vendor not found" });
      } else {
        await Vendor.update(updatedData, {
          where: { id },
        });
        const updatedVendor = await Vendor.findByPk(id);
        return res.status(200).json(updatedVendor);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  deleteVendor: async (req, res) => {
    const { id } = req.params;
    try {
      const vendor = await Vendor.findByPk(id);
      if (!vendor) {
        return res.status(404).send({ error: "Vendor not found" });
      } else {
        await Vendor.destroy({
          where: { id },
        });
        return res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = vendorController;
