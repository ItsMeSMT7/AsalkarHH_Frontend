import { Edit2, Trash2, Star } from 'lucide-react';
import styles from './Style/AddressCard.module.css';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, selectable, selected, onSelect }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''} ${selectable ? styles.selectable : ''}`}
      onClick={selectable ? onSelect : undefined}
    >
      <div className={styles.header}>
        <span className={styles.label}>{address.label || 'Home'}</span>
        {address.isDefault && <span className={styles.defaultBadge}><Star size={12} /> Default</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{address.fullName}</p>
        <p>{address.streetAddress}</p>
        <p>{address.city}{address.subDistrict ? `, ${address.subDistrict}` : ''}</p>
        <p>{address.district}, {address.state} - {address.pincode}</p>
        <p className={styles.phone}>📞 {address.phone}</p>
      </div>
      {!selectable && (
        <div className={styles.actions}>
          {onEdit && <button className={styles.editBtn} onClick={onEdit}><Edit2 size={14} /> Edit</button>}
          {!address.isDefault && onSetDefault && <button className={styles.defaultBtn} onClick={onSetDefault}><Star size={14} /> Set Default</button>}
          {onDelete && <button className={styles.deleteBtn} onClick={onDelete}><Trash2 size={14} /></button>}
        </div>
      )}
    </div>
  );
};

export default AddressCard;