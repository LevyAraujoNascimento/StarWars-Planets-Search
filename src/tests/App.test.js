import React from 'react';
import { render, screen } from '@testing-library/react';
import { dataInfo } from './mockHelpers';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('se o menu de filtros é renderizado na tela.', () => {
  render(<App />);

  const title = screen.getByText(/STAR WARS/i);
  const nameFilter = screen.getByTestId('name-filter');
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');
  const columnSort = screen.getByTestId('column-sort');
  const columnSortASC = screen.getByTestId('column-sort-input-asc');
  const columnSortDESC = screen.getByTestId('column-sort-input-desc');
  const columnSortButton = screen.getByTestId('column-sort-button');
  const buttonRemoveFilters = screen.getByTestId('button-remove-filters');

  expect(title).toBeInTheDocument();
  expect(nameFilter).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
  expect(columnSort).toBeInTheDocument();
  expect(columnSortASC).toBeInTheDocument();
  expect(columnSortDESC).toBeInTheDocument();
  expect(columnSortButton).toBeInTheDocument();
  expect(buttonRemoveFilters ).toBeInTheDocument();

  expect(title).toHaveTextContent('STAR WARS');

});

test('se ao clickar no botão filtrar, um filtro aparece.', () => {
  render(<App />);

  const buttonFilter = screen.getByTestId('button-filter');
  expect(buttonFilter).toBeInTheDocument();
  userEvent.click(buttonFilter);

  const filters = screen.getAllByTestId('filter');
  expect(filters).toHaveLength(1);
});

test('se a API é chamada com sucesso.', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(dataInfo),
  });

  render(<App />);

  const planetsInfo = await screen.findAllByTestId('planet-name');
  expect(planetsInfo).toHaveLength(10);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
});

test('se filtrar por nome está funcionando.', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(dataInfo),
  });

  render(<App />);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

  const nameFilter = screen.getByTestId('name-filter');
  expect(nameFilter).toBeInTheDocument();
  userEvent.type(nameFilter, 'oo');

  const newPlanetsInfo = await screen.findAllByTestId('planet-name');
  expect(newPlanetsInfo).toHaveLength(2);
});

test('se ordenar de forma ascendente está funcionando.', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(dataInfo),
  });

  render(<App />);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

  const nameFilter = screen.getByTestId('name-filter');
  expect(nameFilter).toBeInTheDocument();
  userEvent.type(nameFilter, 'oo');

  const columnSortASC = screen.getByTestId('column-sort-input-asc');
  userEvent.click(columnSortASC);

  const columnSortButton = screen.getByTestId('column-sort-button');
  userEvent.click(columnSortButton);

  const newPlanetsInfo = await screen.findAllByTestId('planet-name');
  expect(newPlanetsInfo[0]).toHaveTextContent('Tatooine');
  expect(newPlanetsInfo[1]).toHaveTextContent('Naboo');
  expect(newPlanetsInfo).toHaveLength(2);
});
