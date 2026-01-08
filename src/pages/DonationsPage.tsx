import React, { useState, useEffect } from "react";
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

interface MaterialDonation {
  id: number;
  donor: string;
  name: string;
  condition: string;
  description?: string;
  image?: string;
  createdAt: string;
}

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
    image: null as string | null,
  });

  const [donations, setDonations] = useState<MaterialDonation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("material_donations");
    if (saved) {
      setDonations(JSON.parse(saved));
    }
  }, []);

  const saveDonations = (data: MaterialDonation[]) => {
    localStorage.setItem("material_donations", JSON.stringify(data));
    setDonations(data);
  };

  const handleMaterialDonation = () => {
    if (!user || !material.name || !material.condition) return;

    const newDonation: MaterialDonation = {
      id: Date.now(),
      donor: `${user.firstName} ${user.lastName}`,
      name: material.name,
      condition: material.condition,
      description: material.description,
      image: material.image || undefined,
      createdAt: "À l’instant",
    };

    const updated = [newDonation, ...donations];
    saveDonations(updated);

    addPoints(50);
    setMaterial({ name: "", condition: "", description: "", image: null });
    setSuccessMessage("Merci pour votre don de matériel ! +50 points 🎉");
  };

  /* =======================
     DON D’ARGENT (FICTIF)
  ======================= */
  const [amount, setAmount] = useState("");

  const handleMoneyDonation = () => {
    const value = Number(amount);
    if (!user || !value || value <= 0) return;

    const earnedPoints = value * 10;
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
    <div className="container mx-auto px-4 py-8 max-w-4xl flex flex-col gap-8">
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
      <Card className="m-[4] mb-10 shadow-lg border-2 border-[#FF8C42]/20 bg-gradient-to-br from-white to-[#FF8C42]/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-[#FF8C42]" />
            <h2 className="text-xl font-semibold text-[#2C5F8D]">
              Don de matériel
            </h2>
          </div>

          <Input
            placeholder="Nom du matériel"
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
          />

          {/* IMAGE OPTIONNELLE */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-[#FF8C42]">
            <ImageIcon className="h-5 w-5" />
            Ajouter une image (optionnel)
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setMaterial({
                    ...material,
                    image: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </label>

          {material.image && (
            <img
              src={material.image}
              alt="preview"
              className="rounded-lg max-h-60 object-cover border"
            />
          )}

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
      <Card className="mt-12 shadow-lg border-2 border-[#2C5F8D]/20 bg-gradient-to-br from-white to-[#2C5F8D]/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
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

      {/* =======================
          LISTE DES DONS
      ======================= */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#2C5F8D]">
          Dons de matériel de la communauté
        </h3>

        {donations.length === 0 && (
          <p className="text-muted-foreground">Aucun don pour le moment.</p>
        )}

        {donations.map((donation) => (
          <Card key={donation.id} className="shadow-md">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {donation.donor} • {donation.createdAt}
              </div>

              <h4 className="font-semibold text-[#2C5F8D]">
                {donation.name} — {donation.condition}
              </h4>

              {donation.description && (
                <p className="text-sm">{donation.description}</p>
              )}

              {donation.image && (
                <img
                  src={donation.image}
                  alt=""
                  className="rounded-lg max-h-60 object-cover border"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
