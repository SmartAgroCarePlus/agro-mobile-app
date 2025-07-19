// export const submitDiagnosis = async (diagnosis) => {
//     const response = await fetch("http://localhost:5001/api/diagnose", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(diagnosis),
//     });
//
//     if (!response.ok) throw new Error("Erreur lors de l'envoi du diagnostique");
//     return response.json();
// };
//
// export const fetchHistory = async (userId: string) => {
//     const response = await fetch(`http://localhost:5001/api/history/${userId}`);
//     if (!response.ok) throw new Error("Erreur lors du chargement de l'historique");
//     return response.json();
// };
