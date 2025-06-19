import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Business, BankBenefit } from "../types";
import { fetchBusinesses } from "../services/api";
import { ArrowLeft } from "lucide-react";

function Benefit() {
  const { id, benefitIndex } = useParams<{ id: string; benefitIndex: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [benefit, setBenefit] = useState<BankBenefit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const businesses = await fetchBusinesses();
        const found = businesses.find((b: Business) => b.id === id);
        setBusiness(found || null);
        if (found && benefitIndex !== undefined) {
          const idx = parseInt(benefitIndex, 10);
          setBenefit(found.benefits[idx] || null);
          setError(found.benefits[idx] ? null : "Benefit not found");
        } else {
          setBenefit(null);
          setError("Benefit not found");
        }
      } catch (err) {
        setError("Failed to load business");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, benefitIndex]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!business || !benefit) return null;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </button>
      <h2 className="text-2xl font-bold mb-4">
        {business.name} - {benefit.cardName}
      </h2>
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-2">
          {benefit.bankName} {benefit.cardName}
        </h3>
        <p className="mb-2">{benefit.benefit}</p>
        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-2">
          {benefit.rewardRate}
        </div>
        <p className="text-gray-600 mt-4">{business.description}</p>
      </div>
    </div>
  );
}

export default Benefit;
