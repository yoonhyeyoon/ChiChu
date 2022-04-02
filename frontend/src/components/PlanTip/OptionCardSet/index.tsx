import React from 'react';
import OptionCardList from './OptionCardList';

function OptionCards() {
  const list = [
    {
      name: '임플란트',
      name2: '틀니',
      description:
        '임플란트는 잇몸에 인공치아를 삽입하는 것이고, 틀니는 수술 없이 입에 껴서 사용합니다.',
      symptom: '나이가 들어서 치아가 많이 빠졌어요',
      image: '',
    },
    {
      name: '신경치료',
      name2: null,
      description:
        '치아의 깊은 곳에는 신경이 있는데, 이 신경이 균에 감염되면 치아가 시리고 아프게 됩니다. 이 때는 신경을 제거하고 다른 재료로 채워넣는 신경치료를 진행합니다.',
      symptom: '이가 시리고 아파요!',
      image: '',
    },
    {
      name: '잇몸질환',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
    {
      name: '1',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
    {
      name: '2',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
    {
      name: '3',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
    {
      name: '4',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
    {
      name: '5',
      description:
        '잇몸은 이를 단단히 잡아주는 받침대입니다! 잇몸질환은 치아 상실의 원인이 될 수 있으니 미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 아파요!',
      image: '',
    },
  ];
  return (
    <>
      <OptionCardList list={list} />
    </>
  );
}

export default OptionCards;
