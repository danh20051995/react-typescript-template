import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { TAppDispatch, TAppState } from 'src/store'

export const useAppDispatch = () => useDispatch<TAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector
