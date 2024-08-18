import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowUp } from 'react-feather';
import axiosClient from '@/services/axios';
import { inputTextValues, inputTextSchema } from '@/types/validations';
import { zodResolver } from '@hookform/resolvers/zod';

const TextInput = () => {
  const [sentiment, setSentiment] = useState(null);

  const { register, handleSubmit, watch } = useForm<inputTextValues>({
    resolver: zodResolver(inputTextSchema)
  });

  const inputValue = watch('textInput');

  const onSubmit: SubmitHandler<inputTextValues> = async (values: inputTextValues) => {
    try {
      const response = await axiosClient.post('https://api.example.com/sentiment-analysis', {
        text: values.textInput
      });
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div className="grid place-items-center w-full mt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="grid place-items-center w-full mt-12">
        <div
          className={`grid grid-cols-[1fr_auto] items-center w-[740px] h-[84px] p-[20px_21px_20px_28px] border rounded-[23px] transition-all duration-300 ${
            inputValue ? 'bg-white border-black shadow-lg' : 'border-gray-400'
          }`}
        >
          <input
            type="text"
            placeholder="Chat with CynchAI..."
            {...register('textInput')}
            className="w-full text-[24px] font-inter font-medium text-black outline-none"
          />
          <div
            className={`grid place-items-center w-[42px] h-[42px] rounded-[8px] transition-all duration-300 ${
              inputValue ? 'bg-black' : 'bg-black/25'
            }`}
          >
            <button
              type="submit"
              className={`grid place-items-center w-[42px] h-[42px] rounded-[8px] transition-all duration-300 ${
                inputValue ? 'bg-black' : 'bg-black/25'
              }`}
            >
              <ArrowUp
                className={`w-[24px] h-[24px] text-white transition-all duration-300 ${
                  inputValue ? 'text-white' : 'text-gray-400'
                }`}
              />
            </button>
          </div>
        </div>
      </form>

      {sentiment && (
        <div className="mt-6 text-lg">
          Sentiment Analysis Result: <strong>{sentiment}</strong>
        </div>
      )}
    </div>
  );
};

export default TextInput;
