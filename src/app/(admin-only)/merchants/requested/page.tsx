export default function RequestedMerchantsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Requested Merchants</h1>
        <p className="text-gray-600">Pending merchant applications</p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          Merchant requests will be available once the backend is deployed.
        </p>
      </div>
    </div>
  );
}
