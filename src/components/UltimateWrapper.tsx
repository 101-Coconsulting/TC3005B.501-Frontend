import { useCallback, useState } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";
import Toast from "@components/Toast";

interface Props {
	user_id: number;
  endpoint: string;
  title: string;
  message: string;
  modal_type: "success" | "warning";
  children: React.ReactNode;
  token: string;
  redirectTo?: string;
}

export default function UltimateWrapper({ 
	user_id,
	endpoint,
	title,
	message,
	modal_type,
	children,
	token,
	redirectTo = "/dashboard"
}: Props) {
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
	const handleConfirm = useCallback(async () => {
		try {
			const url = `${endpoint}/${user_id}`;
			await apiRequest(url, { 
				method: "PUT",
				headers: { Authorization: `Bearer ${token}` }
			});
			setToast({ message: 'Usuario desactivado exitosamente.', type: 'success' });
			await new Promise(resolve => setTimeout(resolve, 2000));
			window.location.href=redirectTo;
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	}, [endpoint]);

	return (
		<>
			<ModalWrapper
				title={title}
				message={message}
				button_type={modal_type}
				modal_type={modal_type}
				onConfirm={handleConfirm}
			>
				{children}
			</ModalWrapper>
			{toast && <Toast message={toast.message} type={toast.type} />}
		</>
	);
}