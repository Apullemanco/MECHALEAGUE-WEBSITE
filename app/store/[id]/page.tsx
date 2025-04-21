"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ArrowLeft, Minus, Plus, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export default function ProductPage({ params }) {
  const router = useRouter()
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const isMobile = useMobile()

  // Exchange rate USD to MXN (approximate)
  const exchangeRate = 17.5

  // Convert USD price to MXN
  const convertToMXN = (usdPrice) => {
    return (usdPrice * exchangeRate).toFixed(2)
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Producto No Encontrado</h1>
            <p className="mb-6">Lo sentimos, el producto que buscas no existe.</p>
            <Button asChild>
              <Link href="/store">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a la Tienda
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    // Get current cart from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product already exists in cart
    const existingProductIndex = currentCart.findIndex((item) => item.id === product.id)

    if (existingProductIndex >= 0) {
      // Update quantity if product already in cart
      currentCart[existingProductIndex].quantity += quantity
    } else {
      // Add new product to cart
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart))

    // Show success state
    setAddedToCart(true)

    // Reset success state after 2 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  // Get related products (same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/store">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la Tienda
            </Link>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`
                }}
              />
              {product.featured && <Badge className="absolute top-4 right-4 bg-primary">Destacado</Badge>}
              {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500">Nuevo</Badge>}
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold mb-4">MX${convertToMXN(product.price)}</p>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Cantidad</h3>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full md:w-auto" size="lg" onClick={addToCart} disabled={addedToCart}>
                  {addedToCart ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Añadido al Carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Añadir al Carrito
                    </>
                  )}
                </Button>

                <div className="border-t pt-6 mt-6">
                  <Tabs defaultValue="details">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Detalles</TabsTrigger>
                      <TabsTrigger value="shipping">Envío</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="text-sm space-y-2">
                      <p>• Materiales de calidad premium</p>
                      <p>• Mercancía oficial de MechaLeague</p>
                      <p>• Artículo de edición limitada</p>
                      <p>• Diseñado por el equipo de MechaLeague</p>
                    </TabsContent>
                    <TabsContent value="shipping" className="text-sm space-y-2">
                      <p>• Envío gratuito en pedidos superiores a MX$875</p>
                      <p>• Envío estándar: 3-5 días hábiles</p>
                      <p>• Envío express disponible al finalizar la compra</p>
                      <p>• Envío internacional disponible</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">También te puede gustar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden">
                    <Link href={`/store/${relatedProduct.id}`} className="group">
                      <div className="relative h-48 w-full bg-muted">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(relatedProduct.name)}`
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="font-bold mt-1">MX${convertToMXN(relatedProduct.price)}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Playera MechaLeague",
    description: "Playera oficial con logo de MechaLeague en algodón premium",
    price: 24.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: true,
    isNew: false,
    date: "2023-11-15",
  },
  {
    id: 2,
    name: "Sudadera Founders Championship",
    description: "Sudadera conmemorativa del torneo inaugural de MechaLeague",
    price: 49.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: true,
    isNew: false,
    date: "2023-11-25",
  },
  {
    id: 3,
    name: "Gorra MechaLeague",
    description: "Gorra ajustable con logo bordado de MechaLeague",
    price: 19.99,
    image: "/placeholder.svg",
    category: "apparel",
    featured: false,
    isNew: true,
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Póster Equipo Vector -1",
    description: "Póster de edición limitada del equipo Vector -1",
    price: 14.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: false,
    isNew: false,
    date: "2023-12-05",
  },
  {
    id: 5,
    name: "Cuaderno MechaLeague",
    description: "Cuaderno premium con marca MechaLeague",
    price: 12.99,
    image: "/placeholder.svg",
    category: "stationery",
    featured: false,
    isNew: true,
    date: "2024-02-15",
  },
  {
    id: 6,
    name: "Botella Chemistry Quest",
    description: "Botella de acero inoxidable con logo de Chemistry Quest",
    price: 29.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: true,
    isNew: true,
    date: "2024-03-01",
  },
  {
    id: 7,
    name: "Set de Plumas MechaLeague",
    description: "Set de 3 plumas premium con marca MechaLeague",
    price: 15.99,
    image: "/placeholder.svg",
    category: "stationery",
    featured: false,
    isNew: false,
    date: "2023-10-20",
  },
  {
    id: 8,
    name: "Colección de Pines de Equipos",
    description: "Set de pines coleccionables con todos los equipos de MechaLeague",
    price: 24.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: false,
    isNew: false,
    date: "2023-11-30",
  },
  {
    id: 9,
    name: "Bandera MechaLeague",
    description: "Bandera oficial de MechaLeague para eventos y exhibición",
    price: 34.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: false,
    date: "2023-12-15",
  },
  {
    id: 10,
    name: "Aretes Diseño Robot",
    description: "Aretes elegantes inspirados en diseños de robots de MechaLeague",
    price: 19.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: true,
    date: "2024-02-28",
  },
  {
    id: 11,
    name: "Dije MechaLeague",
    description: "Dije metálico con logo de MechaLeague en cadena",
    price: 22.99,
    image: "/placeholder.svg",
    category: "accessories",
    featured: false,
    isNew: false,
    date: "2023-11-10",
  },
  {
    id: 12,
    name: "Póster Conmemorativo Championship",
    description: "Póster de edición limitada del Founders Championship",
    price: 17.99,
    image: "/placeholder.svg",
    category: "collectibles",
    featured: true,
    isNew: false,
    date: "2023-12-01",
  },
]
