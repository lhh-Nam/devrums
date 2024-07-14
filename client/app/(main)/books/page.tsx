import { title } from "@/components/primitives";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";

export default function BooksPage() {
  const renderBook = () => {
    return (
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h2 className="text-large text-foreground/90 font-medium mb-2">
                    Book title
                  </h2>
                  <p className="text-small text-foreground/80">Description</p>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1"></div>

              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className={title()}>Books</h1>
      </div>

      <div className="gap-6 grid grid-cols-2">
        {renderBook()}
        {renderBook()}
        {renderBook()}
      </div>
    </div>
  );
}
