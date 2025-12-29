export default function WithdrawConfirm({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Withdraw Paper
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to withdraw this paper?
          <br />
          <span className="text-sm text-gray-500">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
