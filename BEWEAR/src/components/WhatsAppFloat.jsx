function WhatsAppFloat() {
  const phoneNumber = "94703722496"; // 🔴 Change to your number

  const openWhatsApp = () => {
    const message = "Hello BEWEAR 👋 I need assistance.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={floatStyle} onClick={openWhatsApp}>
      💬
    </div>
  );
}

const floatStyle = {
  position: "fixed",
  bottom: "25px",
  right: "25px",
  backgroundColor: "#25D366",
  color: "white",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "28px",
  cursor: "pointer",
  boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
  zIndex: 1000
};

export default WhatsAppFloat;