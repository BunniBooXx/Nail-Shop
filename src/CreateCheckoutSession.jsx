const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`order/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const initiateCheckout = async () => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            name: order.name,
            price: order.price,
          },
        }),
      });

      const session = await response.json();
      if (session.error) {
        console.error('Error creating checkout session:', session.error);
      } else {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (order) {
      initiateCheckout();
    }
  }, [order]);

  return null;
};
