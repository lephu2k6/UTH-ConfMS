export default function SubmissionForm({ data, setData, disabled }) {
  const handleChange = (e) => {
    if (disabled) return;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-lg">Thông tin </h3>

      <input
        name="title"
        value={data.title}
        placeholder="Paper title"
        disabled={disabled}
        onChange={handleChange}
        className={`border p-2 rounded w-full ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />

      <textarea
        name="abstract"
        value={data.abstract}
        placeholder="Abstract"
        rows={4}
        disabled={disabled}
        onChange={handleChange}
        className={`border p-2 rounded w-full ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />

      <input
        name="keywords"
        value={data.keywords}
        placeholder="Keywords"
        disabled={disabled}
        onChange={handleChange}
        className={`border p-2 rounded w-full ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />

      {disabled && (
        <p className="text-sm text-gray-500">
        </p>
      )}
    </div>
  );
}
