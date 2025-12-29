export default function AssignmentTable({ papers, onAssign }) {
  if (!papers.length) {
    return (
      <p className="text-gray-500 italic">
        Tất cả paper đã được assign reviewer
      </p>
    );
  }

  return (
    <table className="w-full border rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Title</th>
          <th className="p-3">Author</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {papers.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-3">{p.title}</td>
            <td className="p-3 text-center">{p.authorName}</td>
            <td className="p-3 text-center">
              <button
                onClick={() => onAssign(p)}
                className="px-4 py-1 bg-teal-600 text-white rounded"
              >
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
