import type { LucideIcon } from "lucide-react";
import { AlignLeft, List, Hash, DollarSign, ToggleLeft, Calendar, Tag, Percent, Banknote } from "lucide-react";
import type { ColumnFormat } from "../shared/types";

export const FORMAT_OPTIONS: Array<{ value: ColumnFormat; label: string; icon: LucideIcon }> = [
    { value: "text",            label: "Texto Livre",       icon: AlignLeft  },
    { value: "bulleted_list",   label: "Lista de marcadores",   icon: List       },
    { value: "number",          label: "Número",          icon: Hash       },
    { value: "percentage",      label: "Porcentagem",      icon: Percent    },
    { value: "monetary_amount", label: "Valor Monetário", icon: Banknote   },
    { value: "currency",        label: "Moeda",        icon: DollarSign },
    { value: "yes_no",          label: "Sim / Não",        icon: ToggleLeft },
    { value: "date",            label: "Data",            icon: Calendar   },
    { value: "tag",             label: "Tags",            icon: Tag        },
];

export function formatLabel(format: ColumnFormat): string {
    return FORMAT_OPTIONS.find((o) => o.value === format)?.label ?? "Texto";
}

export function formatIcon(format: ColumnFormat): LucideIcon {
    return FORMAT_OPTIONS.find((o) => o.value === format)?.icon ?? AlignLeft;
}
