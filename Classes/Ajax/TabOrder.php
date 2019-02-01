<?php
namespace ArminVieweg\T3ddy\Ajax;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Http\Response;
use \TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class TabOrder
 *
 * @package ArminVieweg\T3ddy
 */
class TabOrder
{
    /**
     * Perform change of sortings of given tab.
     * Outputs json string response.
     *
     * @param ServerRequestInterface $request
     * @param Response $response
     * @return Response
     */
    public function change(ServerRequestInterface $request, Response $response) : Response
    {
        $parameters = GeneralUtility::_GPmerged('t3ddy');

        /** @var ConnectionPool $connectionPool */
        $connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
        $queryBuilder = clone $connectionPool->getQueryBuilderForTable('tt_content');
        $movedItemRow = $queryBuilder
            ->select('*')
            ->from('tt_content')
            ->where($queryBuilder->expr()->eq('uid', (int) $parameters['item']))
            ->execute()
            ->fetch(\PDO::FETCH_ASSOC);

        /** @var DataHandler $dataHandler */
        $dataHandler = GeneralUtility::makeInstance(DataHandler::class);
        $cmd = [];
        if ($parameters['insertAfter']) {
            $cmd['tt_content'][$movedItemRow['uid']]['move'] = '-' . $parameters['insertAfter'];
        } else {
            $cmd['tt_content'][$movedItemRow['uid']]['move'] = $movedItemRow['pid'];
        }
        $dataHandler->start([], $cmd);
        $dataHandler->process_cmdmap();

        $response->getBody()->write(json_encode(['status' => 'ok']));
        return $response;
    }
}
