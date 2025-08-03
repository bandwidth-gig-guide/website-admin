import React from "react";
import styles from "./FormComponentTicketPrices.module.css";
import { Event } from "../../../types/models/Event";

interface Props {
  record: Event;
  setRecord: React.Dispatch<React.SetStateAction<Event>>;
}

const FormComponentTicketPrices: React.FC<Props> = ({ record, setRecord }) => {
  const handleChange = (index: number, field: "ticketType" | "price", value: string) => {
    setRecord(prev => {
      if (!prev) return prev;
      const updatedPrices = [...prev.prices];
      updatedPrices[index] = {
        ...updatedPrices[index],
        [field]: field === "price" ? parseFloat(value) || 0 : value
      };
      return { ...prev, prices: updatedPrices };
    });
  };

  const handleAdd = () => {
    setRecord(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        prices: [...prev.prices, { ticketType: "", Price: 0 }]
      };
    });
  };

  const handleRemove = (index: number) => {
    setRecord(prev => {
      if (!prev) return prev;
      const updatedPrices = prev.prices.filter((_, i) => i !== index);
      return { ...prev, prices: updatedPrices };
    });
  };

  return (
    <div className={styles.wrapper}>
      {record.prices && record.prices.map((price, index) => (
        <div key={index} className={styles.rowWrapper}>
          <input
            type="text"
            placeholder="Ticket Type"
            value={price.ticketType}
            onChange={e => handleChange(index, "ticketType", e.target.value)}
          />
          <input
            type="number"
            placeholder="price"
            value={price.price}
            min="0"
            step="0.01"
            onChange={e => handleChange(index, "price", e.target.value)}
          />
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => handleRemove(index)}
          >
            <img src="/circle-cross.svg" alt="" />
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAdd} className="addButton">
        Add Ticket Price
      </button>
    </div>
  );
};

export default FormComponentTicketPrices;
