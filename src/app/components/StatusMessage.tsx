interface StatusMessageProps {
  isLoading: boolean;
  totalCount: number;
}

export function StatusMessage({ isLoading, totalCount }: StatusMessageProps) {
  let message: string;

  if (isLoading) {
    message = "Loading...";
  } else if (totalCount === 0) {
    message = "No advocates found";
  } else {
    message = `${totalCount.toLocaleString()} result${totalCount === 1 ? '' : 's'} found`;
  }

  return (
    <p className="text-lg text-center italic">{message}</p>
  );
}
