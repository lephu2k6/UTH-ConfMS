export default function BlindInfo() {
  return (
    <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
      <div className="flex items-start gap-3">
        <div className="text-yellow-600 text-xl">⚠️</div>

        <div>
          <h3 className="text-sm font-semibold text-yellow-800">
            Blind Review Enabled
          </h3>

          <p className="mt-1 text-sm text-yellow-700">
            Author information is hidden to ensure an unbiased and fair review
            process. Please evaluate the paper based only on its content.
          </p>
        </div>
      </div>
    </div>
  );
}
