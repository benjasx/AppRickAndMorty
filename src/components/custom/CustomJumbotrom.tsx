interface Props {
  title: string;
  description?: string;
}

export const CustomJumbotrom = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-10 mt-10">
      <h1 className="text-5xl bg-linear-to-r from-green-500 to bg-green-900 bg-clip-text text-transparent mb-4 ">
        {title}
      </h1>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </div>
  );
};
