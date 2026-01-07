import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Gift,
  Euro,
  User,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function DonationsPage() {
  const { user, addPoints } = useAuth();

  const [successMessage, setSuccessMessage] = useState("");

  /* =======================
     DON DE MATÉRIEL
  ======================= */
  const [material, setMaterial] = useState({
    name: "",
    condition: "",
    description: "",
  });

  const handleMaterialDonation = () => {
    if (!user || !material.name || !material.condition) return;

    addPoints(50); // +50 points fixes
    setMaterial({ name: "", condition: "", description: "" });
    setSuccessMessage("Merci pour votre don de matériel ! +50 points 🎉");
  };

  /* =======================
     DON D’ARGENT (FICTIF)
  ======================= */
  const [amount, setAmount] = useState("");

  const handleMoneyDonation = () => {
    const value = Number(amount);
    if (!user || !value || value <= 0) return;

    const earnedPoints = value * 10; // 1€ = 10 points
    addPoints(earnedPoints);
    setAmount("");
    setSuccessMessage(`Merci pour votre don ! +${earnedPoints} points 🎉`);
  };

  /* =======================
     UTILISATEUR NON CONNECTÉ
  ======================= */
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">
          Vous devez être connecté pour faire un don
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* =======================
          TITRE
      ======================= */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C5F8D] mb-3">
          Dons & Solidarité
        </h1>
        <p className="text-muted-foreground text-lg">
          Soutenez la communauté et gagnez des points de fidélité
        </p>

        <Badge className="mt-4 bg-[#FF8C42]">
          🪙 {user.points_fidelite ?? 0} points de fidélité
        </Badge>
      </div>

      {/* =======================
          MESSAGE DE SUCCÈS
      ======================= */}
      {successMessage && (
        <Card className="mb-6 border-green-500">
          <CardContent className="p-4 flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            {successMessage}
          </CardContent>
        </Card>
      )}

      {/* =======================
          DON DE MATÉRIEL
      ======================= */}
      <Card className="mb-8 shadow-lg border-2 border-[#FF8C42]/20 bg-gradient-to-br from-white to-[#FF8C42]/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="h-6 w-6 text-[#FF8C42]" />
            <h2 className="text-xl font-semibold text-[#2C5F8D]">
              Don de matériel
            </h2>
          </div>

          <Input
            placeholder="Nom du matériel (ex : perceuse, planches...)"
            value={material.name}
            onChange={(e) => setMaterial({ ...material, name: e.target.value })}
          />

          <Input
            placeholder="État (neuf, bon état, usé...)"
            value={material.condition}
            onChange={(e) =>
              setMaterial({ ...material, condition: e.target.value })
            }
          />

          <Textarea
            placeholder="Description (optionnel)"
            value={material.description}
            onChange={(e) =>
              setMaterial({ ...material, description: e.target.value })
            }
            className="min-h-[100px]"
          />

          <Button
            onClick={handleMaterialDonation}
            disabled={!material.name || !material.condition}
            className="bg-[#FF8C42] hover:bg-[#FF8C42]/90"
          >
            Donner du matériel (+50 points)
          </Button>
        </CardContent>
      </Card>

      {/* =======================
          DON D’ARGENT
      ======================= */}
      <Card className="shadow-lg border-2 border-[#2C5F8D]/20 bg-gradient-to-br from-white to-[#2C5F8D]/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Euro className="h-6 w-6 text-[#2C5F8D]" />
            <h2 className="text-xl font-semibold text-[#2C5F8D]">
              Don d’argent (fictif)
            </h2>
          </div>

          <Input
            type="number"
            min="1"
            placeholder="Montant en €"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <p className="text-sm text-muted-foreground">
            💡 1€ donné = <strong>10 points</strong>
          </p>

          <Button
            onClick={handleMoneyDonation}
            disabled={!amount}
            className="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90"
          >
            Faire un don
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
