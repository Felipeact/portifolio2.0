import { useSpring, useTransform, SpringOptions, MotionValue } from "framer-motion";

type TransformFunction<T> = (value: T) => T;

interface SmoothTransformProps<T> {
  value: MotionValue<T>;
  springOptions: SpringOptions;
  transformers: TransformFunction<T>[];
}

export function useSmoothTransform<T>({
  value,
  springOptions,
  transformers,
}: SmoothTransformProps<T>) {
  const transformedValue = transformers.reduce((acc, transformer) => {
    return useTransform(acc, transformer);
  }, value);

  return useSpring(transformedValue, springOptions);
}

