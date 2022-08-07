import { useError } from '@/store';
import { HandledError } from '@/utils';

export default (name, err) => {
  const error = useError();

  error.reset(name);

  if (err?.response) {
    const { status, data } = err.response;
    const handledStatus = [422, 401];

    if (handledStatus.includes(status)) {
      error.add(name, {
        status,
        errors: data.errors,
      });

      throw new HandledError('', status, data.errors);
    }
  }

  throw err;
};
