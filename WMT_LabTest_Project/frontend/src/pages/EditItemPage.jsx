import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";
import { motion } from "framer-motion";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateItem(id, formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);
      alert("Failed to update item");
    }
  };

  if (!item) return <p>Loading item details...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ItemForm
        initialValues={item}
        submitText="Update Item"
        onSubmit={handleUpdate}
      />
    </motion.div>
  );
}

export default EditItemPage;