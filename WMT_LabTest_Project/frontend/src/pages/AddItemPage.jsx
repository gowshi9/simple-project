import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";
import { motion } from "framer-motion";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createItem(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);
      alert("Failed to create item");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <ItemForm submitText="Add Item" onSubmit={handleCreate} />
    </motion.div>
  );
}

export default AddItemPage;