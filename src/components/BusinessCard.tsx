import React, { useState } from "react";
import { ChevronDown, Star, MapPin, CreditCard } from "lucide-react";
import { Business } from "../types";

interface BusinessCardProps {
  business: Business;
  onBenefitClick?: (benefitIndex: number) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onBenefitClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const benefits = business.benefits;
  const hasSingleBenefit = benefits.length === 1;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{business.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{business.rating}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{business.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* <p className="text-gray-600 mb-4 leading-relaxed">{business.description}</p> */}

        {hasSingleBenefit ? (
          <div className="space-y-3">
            <button
              type="button"
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl w-full text-left"
              onClick={() => onBenefitClick && onBenefitClick(0)}
            >
              <div className={`${benefits[0].color} p-2 rounded-lg flex-shrink-0`}>
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{benefits[0].bankName}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-gray-700">{benefits[0].cardName}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {benefits[0].rewardRate}
                </div>
              </div>
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 border border-blue-100"
            >
              <span className="text-blue-700 font-semibold">
                Ver beneficios ({benefits.length})
              </span>
              <ChevronDown
                className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                    style={{
                      animationDelay: isExpanded ? `${index * 100}ms` : "0ms",
                    }}
                    onClick={() => onBenefitClick && onBenefitClick(index)}
                  >
                    <div
                      className={`${benefit.color} p-2 rounded-lg flex-shrink-0`}
                    >
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {benefit.bankName}
                        </h4>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-gray-700">
                          {benefit.cardName}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {benefit.benefit}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {benefit.rewardRate}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
