import React, {useCallback, useRef} from 'react';
import type {FlatListProps} from 'react-native';
import {FlatList} from 'react-native';

type ISafeEndFlatListSafe = FlatListProps<any> & {
  onListEndReach: () => void;
};

const SafeEndFlatList = (
  {onListEndReach, ...props}: ISafeEndFlatListSafe,
  ref: any,
) => {
  const endReached = useRef(false);

  const _onEndReached = useCallback(() => {
    endReached.current = true;
  }, []);

  const _onMomentumScrollEnd = useCallback(() => {
    if (endReached.current) onListEndReach();
    endReached.current = false;
  }, [onListEndReach]);

  return (
    <FlatList
      {...props}
      onEndReached={_onEndReached}
      onMomentumScrollEnd={_onMomentumScrollEnd}
      ref={ref}
    />
  );
};

export default React.forwardRef(SafeEndFlatList);
