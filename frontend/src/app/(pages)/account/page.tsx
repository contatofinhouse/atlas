"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { deleteAccount } from "@/app/lib/mikeApi";

export default function AccountPage() {
    const router = useRouter();
    const { user, signOut } = useAuth();
    const { profile, updateDisplayName, updateOrganisation } = useUserProfile();
    const [displayName, setDisplayName] = useState("");
    const [isSavingName, setIsSavingName] = useState(false);
    const [saved, setSaved] = useState(false);
    const [organisation, setOrganisation] = useState("");
    const [isSavingOrg, setIsSavingOrg] = useState(false);
    const [orgSaved, setOrgSaved] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isManagingSubscription, setIsManagingSubscription] = useState(false);

    useEffect(() => {
        if (profile?.displayName) {
            setDisplayName(profile.displayName);
        }
        if (profile?.organisation) {
            setOrganisation(profile.organisation);
        }
    }, [profile]);

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await deleteAccount();
            await signOut();
            router.push("/");
        } catch {
            setIsDeleting(false);
            setDeleteConfirm(false);
            alert("Falha ao excluir a conta. Tente novamente.");
        }
    };

    const handleSaveDisplayName = async () => {
        setIsSavingName(true);
        const success = await updateDisplayName(displayName.trim());
        setIsSavingName(false);

        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } else {
            alert("Falha ao atualizar o nome. Tente novamente.");
        }
    };

    const handleSaveOrganisation = async () => {
        setIsSavingOrg(true);
        const success = await updateOrganisation(organisation.trim());
        setIsSavingOrg(false);

        if (success) {
            setOrgSaved(true);
            setTimeout(() => setOrgSaved(false), 2000);
        } else {
            alert("Falha ao atualizar a organização. Tente novamente.");
        }
    };

    const handleManageSubscription = async () => {
        if (!profile?.stripeCustomerId) return;
        setIsManagingSubscription(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/stripe/create-portal-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stripeCustomerId: profile.stripeCustomerId,
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Erro ao abrir portal");
            }
        } catch (err) {
            console.error("Portal error:", err);
            alert("Erro ao abrir o portal de gerenciamento. Tente novamente.");
            setIsManagingSubscription(false);
        }
    };

    if (!user) return null;

    return (
        <div className="space-y-4">
            {/* Profile Settings */}
            <div className="pb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-medium font-serif">Perfil</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">
                            Nome de Exibição
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Digite seu nome"
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSaveDisplayName}
                                disabled={
                                    isSavingName || !displayName.trim() || saved
                                }
                                className="min-w-[80px] transition-all bg-black hover:bg-gray-900 text-white"
                            >
                                {isSavingName ? (
                                    "Salvando..."
                                ) : saved ? (
                                    <>
                                        <Check className="h-4 w-3" />
                                        Salvo
                                    </>
                                ) : (
                                    "Salvar"
                                )}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">
                            Organização
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={organisation}
                                onChange={(e) =>
                                    setOrganisation(e.target.value)
                                }
                                placeholder="Digite o nome da empresa/escritório"
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSaveOrganisation}
                                disabled={
                                    isSavingOrg ||
                                    organisation.trim() ===
                                        (profile?.organisation ?? "") ||
                                    orgSaved
                                }
                                className="min-w-[80px] transition-all bg-black hover:bg-gray-900 text-white"
                            >
                                {isSavingOrg ? (
                                    "Salvando..."
                                ) : orgSaved ? (
                                    <>
                                        <Check className="h-4 w-3" />
                                        Salvo
                                    </>
                                ) : (
                                    "Salvar"
                                )}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">
                            E-mail
                        </label>
                        <p className="text-base">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Plan */}
            <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-medium font-serif">
                        Plano de Uso
                    </h2>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-500 capitalize">
                        {profile?.tier === "Free" ? "Grátis" : profile?.tier || "Grátis"}
                    </p>
                    {profile?.tier === "Pro" && profile?.stripeCustomerId && (
                        <Button
                            variant="outline"
                            onClick={handleManageSubscription}
                            disabled={isManagingSubscription}
                            className="text-xs"
                        >
                            {isManagingSubscription ? "Abrindo..." : "Gerenciar Assinatura"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="py-6">
                <h2 className="text-2xl font-medium font-serif mb-4">
                    Ações
                </h2>
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full sm:w-auto"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                </Button>
            </div>

            {/* Danger Zone */}
            <div className="py-6">
                <h2 className="text-2xl font-medium font-serif mb-1 text-red-600">
                    Zona de Risco
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Excluir permanentemente sua conta e todos os dados associados.
                    Esta ação não pode ser desfeita.
                </p>
                {deleteConfirm ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-3 max-w-sm">
                        <p className="text-sm font-medium text-red-700">
                            Tem certeza? Isso excluirá permanentemente sua conta.
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="text-sm"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="text-sm bg-red-600 hover:bg-red-700 text-white"
                            >
                                {isDeleting ? "Excluindo…" : "Excluir Conta"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => setDeleteConfirm(true)}
                        className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        Excluir Conta
                    </Button>
                )}
            </div>
        </div>
    );
}
