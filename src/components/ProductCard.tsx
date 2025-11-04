import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string | number;
  title: string;
  image?: string;
  image_url?: string;
  price: string;
  description?: string;
}

const ProductCard = ({ id, title, image, image_url, price, description }: ProductCardProps) => {
  const imageSource = image || image_url;
  
  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-elegant transition-all duration-500">
      <CardContent className="p-0">
        <div className="relative overflow-hidden aspect-[4/5]">
          {imageSource ? (
            <img
              src={imageSource}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">بدون تصویر</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-6">
        <div className="w-full space-y-2">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
          <p className="text-xl font-semibold text-accent">{price} تومان</p>
        </div>
        <Button className="w-full" variant="default" asChild>
          <Link to={`/products/${id}`}>مشاهده جزئیات</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
