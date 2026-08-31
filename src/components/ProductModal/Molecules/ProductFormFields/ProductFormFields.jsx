import Input from '../../Atoms/Input/Input.jsx';
import Select from '../../Atoms/Select/Select.jsx';
import Textarea from '../../Atoms/Textarea/Textarea.jsx';

export default function ProductFormFields({ form, errors, onChange, categories }) {
  return (
    <>
      <Input
        label="Nombre del producto"
        name="title"
        value={form.title}
        onChange={onChange}
        error={errors.title}
        placeholder="Ej: Auriculares Bluetooth"
      />
      <Input
        label="Precio"
        name="price"
        type="number"
        value={form.price}
        onChange={onChange}
        error={errors.price}
        placeholder="0"
      />
      <Textarea
        label="Descripción"
        name="description"
        value={form.description}
        onChange={onChange}
        error={errors.description}
        placeholder="Descripción del producto"
      />
      <Select
        label="Categoría"
        name="categoryId"
        value={form.categoryId}
        onChange={onChange}
        options={categories}
        error={errors.categoryId}
      />
      <Input
        label="URL de imagen"
        name="images"
        value={form.images?.[0] || ''}
        onChange={onChange}
        placeholder="https://..."
      />
    </>
  );
}
